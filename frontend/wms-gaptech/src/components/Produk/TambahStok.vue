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
        <h1 class="font-semibold">Tambah Stok</h1>
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
                >Kode Produk</label
              >
              <input
                id="productName"
                type="text"
                name="productName"
                class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary"
                required
                disabled
                :value="products.kodeProduk"
              />
            </div>
            <div>
              <label
                for="productName"
                class="block mb-2 text-sm font-medium text-black"
                >Nama Produk</label
              >
              <textarea
                id="productName"
                v-model="products.namaProduk"
                name="productName"
                rows="2"
                class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary"
                disabled
              ></textarea>
            </div>
            <div>
              <label
                for="stockAmount"
                class="block mb-2 text-sm font-medium text-black"
              >
                Tambah Stok Baru <span class="text-red-secondary">*</span>
              </label>
              <input
                id="stockAmountNew"
                v-model="stockAmountNew"
                type="text"
                name="stockAmountNew"
                class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary"
                required
                @input="formatStokInput"
              />
              <p class="text-sm text-red-primary text-end">
                Stok saat ini: {{ products.stok }}
              </p>
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
      <ShowAlert v-show="showAlert">Produk tidak ditemukan!</ShowAlert>
    </div>
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
      stockAmountNew: null,
      loading: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true;
        this.showAlert = false;
        const kodeProduk = this.$route.params.kodeProduk;
        setTimeout(async () => {
          try {
            const response = await axiosInstance.get(`product/${kodeProduk}`);
            this.products = response.data;
            this.loading = false;
          } catch (error) {
            this.loading = false;
            this.showAlert = true;
            console.log(error);
          }
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    },
    saveData() {
      if (
        isNaN(this.stockAmountNew) ||
        parseInt(this.stockAmountNew) <= 0 ||
        parseInt(this.stockAmountNew) != parseFloat(this.stockAmountNew)
      ) {
        this.$refs.notification.showError(
          "Tambah stok hanya menerima bilangan bulat positif",
        );
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
        this.showAlert = false;
        await axiosInstance.patch(`product/${this.products.kodeProduk}`, {
          stokBaru: parseInt(this.stockAmountNew),
        });
        this.$refs.notification.showSuccess("Berhasil mengedit produk!");
        setTimeout(() => {
          this.$router.push("/produk");
        }, 2000);
      } catch (error) {
        console.log(error);
        this.$refs.notification.showError(error.response.data.msg);
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
    goBack() {
      const isConfirmed = window.confirm(
        "Apakah Anda yakin meninggalkan halaman ini?",
      );
      if (isConfirmed) {
        this.$router.push("/produk");
      }
    },
    formatStokInput() {
      let input = this.stockAmountNew.replace(/\D/g, "");
      this.stockAmountNew = input;
    },
  },
};
</script>
