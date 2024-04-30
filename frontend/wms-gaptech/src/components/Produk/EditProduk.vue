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
        <h1 class="font-semibold">Edit Detail Produk</h1>
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
              >Nama Produk</label
            >
            <textarea
              id="productName"
              v-model="products.namaProduk"
              name="productName"
              rows="2"
              class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary"
            ></textarea>
          </div>
          <div>
            <label
              for="rackPosition"
              class="block mb-2 text-sm font-medium text-black"
              >Posisi Rak</label
            >
            <select
              name="rackPosition"
              class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary"
              required
            >
              <option value="">Pilih posisi rak</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="A3">A3</option>
            </select>
          </div>
          <div>
            <label
              for="productPrice"
              class="block mb-2 text-sm font-medium text-black"
              >Harga</label
            >
            <input
              id="productPrice"
              v-model="products.harga"
              type="text"
              name="productPrice"
              class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary"
              @input="formatHargaInput"
            />
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
        await axiosInstance.put(`product/${this.products.kodeProduk}`, {
          namaProduk: this.namaProdukNew,
          harga: this.hargaNew,
          posisiRak: this.posisiRakNEw,
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
    formatHargaInput() {
      const hargaInput = document.getElementById("productPrice");
      hargaInput.addEventListener("input", (event) => {
        const input = event.target.value.replace(/[^\d]/g, "");
        const formattedHarga = input.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        this.products.harga = formattedHarga;
      });
    },
  },
};
</script>
