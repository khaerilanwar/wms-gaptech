<template>
  <section>
    <button class="flex items-center hover:text-blue-primary" @click="goBack">
      <ChevronLeftIcon class="h-6 w-6" />
      <span class="text-sm">Kembali</span>
    </button>
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <div
        v-show="!showAlert"
        class="flex justify-center items-center font-semibold text-3xl mb-2"
      >
        <h1 class="font-semibold">Edit Detail Produk</h1>
      </div>
      <div
        v-show="!showAlert"
        class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border-2 border-blue-primary mx-auto"
      >
        <div class="p-3">
          <form class="space-y-2 md:space-y-2" action="" method="post">
            <div>
              <label
                for="productName"
                class="block mb-2 text-sm font-medium text-black"
                >Nama Produk</label
              >
              <textarea
                id="productName"
                v-model="editProduct.namaProduk"
                name="productName"
                rows="2"
                class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary"
                required
              ></textarea>
            </div>
            <div>
              <label
                for="rackPosition"
                class="block mb-2 text-sm font-medium text-black"
                >Posisi Rak</label
              >
              <select
                id="rackPosition"
                v-model="editProduct.posisiRak"
                name="rackPosition"
                class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary"
                required
              >
                <option>
                  {{ originalProduct.posisiRak }}
                </option>
                <option v-for="rack in racks" :key="rack" :value="rack">
                  {{ rack }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="productPrice"
                class="block mb-2 text-sm font-medium text-black"
                >Harga</label
              >
              <div class="relative flex items-center w-full">
                <span
                  class="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer text-sm"
                  >Rp
                </span>
                <input
                  id="productPrice"
                  v-model="editProduct.harga"
                  required
                  type="text"
                  name="productPrice"
                  class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 pl-10 focus:ring-1 focus:ring-blue-primary"
                  @input="formatHargaInput"
                />
              </div>
            </div>
          </form>
          <div class="flex items-center justify-center mt-2">
            <ComponentButton intent="primary" class="mr-5" @click="saveData"
              >Simpan
            </ComponentButton>
            <ComponentButton intent="danger" @click="cancel"
              >Batal</ComponentButton
            >
          </div>
        </div>
      </div>
    </div>
    <ShowAlert v-show="showAlert">Produk tidak ditemukan!</ShowAlert>
    <Notification ref="notification" />
  </section>
</template>

<script>
import ComponentButton from "../ComponentButton.vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import axiosInstance from "@/utils/api";
import ShowAlert from "../ShowAlert.vue";
import Notification from "../Notification.vue";

export default {
  components: {
    ComponentButton,
    ChevronLeftIcon,
    ShowAlert,
    Notification,
  },
  data() {
    return {
      products: [],
      showAlert: false,
      racks: [],
      editProduct: {
        namaProduk: "",
        harga: null,
        posisiRak: "",
      },
      originalProduct: { namaProduk: "", harga: null, posisiRak: "" },
      loading: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.showAlert = false;
      const kodeProduk = this.$route.params.kodeProduk;
      setTimeout(async () => {
        try {
          const response = await axiosInstance.get(`product/${kodeProduk}`);
          this.products = response.data;
          this.originalProduct = { ...this.products };
          this.editProduct = { ...this.products };
          await this.fetchRacks();
          this.loading = false;
        } catch (error) {
          this.loading = false;
          this.showAlert = true;
          console.log(error);
        }
      }, 1000);
    },
    async fetchRacks() {
      try {
        const response = await axiosInstance.get(`racks/empty`);
        this.racks = response.data.map((rack) => rack.rak);
      } catch (error) {
        console.log(error);
      }
    },
    async saveData() {
      if (
        !this.editProduct.namaProduk ||
        !this.editProduct.harga ||
        !this.editProduct.posisiRak
      ) {
        this.$refs.notification.showError("Form tidak boleh kosong.");
        return;
      }

      if (parseFloat(this.editProduct.harga) <= 0) {
        this.$refs.notification.showError("Harga harus lebih dari 0.");
        return;
      }
      const isConfirmed = window.confirm(
        "Apakah Anda yakin untuk menyimpan perubahan?",
      );
      if (isConfirmed) {
        const dataToUpdate = {};
        if (this.editProduct.namaProduk !== this.originalProduct.namaProduk) {
          dataToUpdate.namaProduk = this.editProduct.namaProduk;
        }
        if (parseFloat(this.editProduct.harga) !== this.originalProduct.harga) {
          dataToUpdate.harga = parseFloat(this.editProduct.harga);
        }
        if (this.editProduct.posisiRak !== this.originalProduct.posisiRak) {
          dataToUpdate.posisiRak = this.editProduct.posisiRak;
        }
        if (Object.keys(dataToUpdate).length > 0) {
          try {
            await axiosInstance.put(
              `product/${this.products.kodeProduk}`,
              dataToUpdate,
            );
            this.$refs.notification.showSuccess("Berhasil memperbarui produk!");
            setTimeout(() => {
              this.$router.push("/produk");
            }, 2000);
          } catch (error) {
            console.log(error);
            this.$refs.notification.showError("Gagal memperbarui produk.");
          }
        } else {
          this.$refs.notification.showInfo(
            "Tidak ada perubahan yang disimpan.",
          );
        }
      }
    },
    cancel() {
      const isConfirmed = window.confirm(
        "Apakah Anda yakin tidak menyimpan perubahan?",
      );
      if (isConfirmed) {
        this.$router.push("/produk");
      }
    },
    goBack() {
      const isConfirmed = window.confirm(
        "Apakah Anda yakin meninggalkan halaman ini?",
      );
      if (isConfirmed) {
        this.$router.push("/produk");
      }
    },
    formatHargaInput() {
      let input = this.editProduct.harga.replace(/\D/g, "");
      this.editProduct.harga = input;
    },
  },
};
</script>
