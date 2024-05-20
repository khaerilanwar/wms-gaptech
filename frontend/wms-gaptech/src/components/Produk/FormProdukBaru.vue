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
      <div class="flex justify-center items-center font-semibold text-3xl mb-2">
        <h1 class="font-semibold">Detail Produk Baru</h1>
      </div>
      <div
        class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border-2 border-blue-primary mx-auto"
      >
        <div class="p-3">
          <form class="space-y-2 md:space-y-2" action="" method="post">
            <div>
              <label
                for="productName"
                class="block mb-2 text-sm font-medium text-black"
                >Nama Produk Baru
                <span class="text-red-secondary">*</span></label
              >
              <textarea
                id="productName"
                v-model="newProduct.namaProduk"
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
                >Posisi Rak <span class="text-red-secondary">*</span>
              </label>
              <select
                id="rackPosition"
                v-model="newProduct.posisiRak"
                name="rackPosition"
                class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary"
                required
              >
                <option value="">Pilih posisi rak</option>
                <option v-for="rack in racks" :key="rack" :value="rack">
                  {{ rack }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="productPrice"
                class="block mb-2 text-sm font-medium text-black"
                >Harga <span class="text-red-secondary">*</span></label
              >
              <div class="relative flex items-center w-full">
                <span
                  class="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer text-sm"
                  >Rp
                </span>
                <input
                  id="productPrice"
                  v-model="newProduct.harga"
                  type="text"
                  name="productPrice"
                  class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 pl-10 focus:ring-1 focus:ring-blue-primary"
                  @input="formatHargaInput"
                />
              </div>
            </div>
            <div>
              <label
                for="stockAmount"
                class="block mb-2 text-sm font-medium text-black"
                >Jumlah stok masuk
                <span class="text-red-secondary">*</span></label
              >
              <input
                id="stockAmount"
                v-model="newProduct.stok"
                type="text"
                name="stockAmount"
                class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary"
                placeholder="Jumlah stok masuk"
                required
                @input="formatStokInput"
              />
            </div>
          </form>
          <div class="flex items-center justify-center mt-2">
            <ComponentButton intent="primary" class="mr-5" @click="saveData">
              Simpan
            </ComponentButton>
            <ComponentButton intent="danger" @click="cancel"
              >Batal</ComponentButton
            >
          </div>
        </div>
      </div>
    </div>
    <Notification ref="notification" />
  </section>
</template>

<script>
import ComponentButton from "../ComponentButton.vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import axiosInstance from "@/utils/api";
import Notification from "../Notification.vue";

export default {
  components: {
    ComponentButton,
    ChevronLeftIcon,
    Notification,
  },
  data() {
    return {
      loading: false,
      racks: [],
      newProduct: {
        namaProduk: "",
        harga: null,
        stok: null,
        posisiRak: "",
      },
    };
  },
  created() {
    this.fetchRacks();
  },
  methods: {
    async fetchRacks() {
      this.loading = true;
      setTimeout(async () => {
        try {
          const response = await axiosInstance.get(`racks/empty`);
          this.racks = response.data.map((rack) => rack.rak);
          this.loading = false;
        } catch (error) {
          this.loading = false;
          console.log(error);
        }
      }, 1000);
    },
    saveData() {
      if (
        !this.newProduct.namaProduk ||
        !this.newProduct.posisiRak ||
        !this.newProduct.harga ||
        !this.newProduct.stok
      ) {
        this.$refs.notification.showError("Semua form harus diisi.");
        return;
      }
      const isConfirmed = window.confirm(
        "Apakah Anda yakin untuk menambahkan data?",
      );
      if (isConfirmed) {
        this.saveDataToServer();
      }
    },
    async saveDataToServer() {
      try {
        await axiosInstance.post("product", {
          namaProduk: this.newProduct.namaProduk,
          harga: this.newProduct.harga,
          stok: this.newProduct.stok,
          posisiRak: this.newProduct.posisiRak,
        });
        this.$refs.notification.showSuccess(
          "Berhasil menambahkan produk baru!",
        );
        setTimeout(() => {
          this.$router.push("/produk");
        }, 2000);
      } catch (error) {
        console.log(error);
        this.$refs.notification.showError(error.response.data.msg);
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
    cancel() {
      const isConfirmed = window.confirm(
        "Apakah Anda yakin tidak menyimpan data?",
      );
      if (isConfirmed) {
        this.$router.push("/produk");
      }
    },
    formatHargaInput() {
      let input = this.newProduct.harga.replace(/\D/g, "");
      this.newProduct.harga = input;
    },
    formatStokInput() {
      let input = this.newProduct.stok.replace(/\D/g, "");
      this.newProduct.stok = input;
    },
  },
};
</script>
