<template>
  <section>
    <div>
      <button class="flex items-center hover:text-blue-primary" @click="goBack">
        <ChevronLeftIcon class="h-6 w-6" />
        <span class="text-sm">Kembali</span>
      </button>
      <div
        v-show="!showAlert"
        class="flex justify-center items-center font-semibold text-3xl mb-2"
      >
        <h1 class="font-semibold">Tambah Stok</h1>
      </div>
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
              Tambah Stok Baru
            </label>
            <input
              id="stockAmountNew"
              v-model="stockAmountNew"
              type="text"
              name="stockAmountNew"
              class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary"
              required
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
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const kodeProduk = this.$route.params.kodeProduk;
        const response = await axiosInstance.get(`product/${kodeProduk}`);
        this.products = response.data;
      } catch (error) {
        this.showAlert = true;
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
        this.$router.push("/produk");
      }
    },
    async saveDataToServer() {
      try {
        this.showAlert = false;
        await axiosInstance.patch(`product/${this.products.kodeProduk}`, {
          stokBaru: parseInt(this.stockAmountNew),
        });
      } catch (error) {
        console.log(error);
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
  },
};
</script>
