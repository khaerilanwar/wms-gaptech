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
      class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border-2 border-blue-primary mx-auto"
    >
      <div class="p-3">
        <form class="space-y-2 md:space-y-2" action="" method="post">
          <div>
            <label
              for="productName"
              class="block mb-2 text-sm font-medium text-black"
              >Nama Produk Baru</label
            >
            <textarea
              id="productName"
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
              >Harga Produk</label
            >
            <input
              id="productPrice"
              type="text"
              name="productPrice"
              class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary"
              placeholder="Harga produk baru"
              required
            />
          </div>
          <div>
            <label
              for="stockAmount"
              class="block mb-2 text-sm font-medium text-black"
              >Jumlah stok masuk</label
            >
            <input
              id="stockAmount"
              type="text"
              name="stockAmount"
              class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary"
              placeholder="Jumlah stok masuk"
              required
            />
          </div>
        </form>
        <div class="flex items-center justify-center mt-2">
          <ComponentButton intent="primary" class="mr-5"
            >Simpan
          </ComponentButton>
          <ComponentButton intent="danger">Batal</ComponentButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ComponentButton from "../ComponentButton.vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";

export default {
  components: {
    ComponentButton,
    ChevronLeftIcon,
  },
  methods: {
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
