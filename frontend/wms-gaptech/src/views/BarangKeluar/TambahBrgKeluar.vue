<template>
  <div class="p-3 h-full">
    <div class="bg-white border p-4 shadow-md rounded-md">
      <h1 class="text-xl font-semibold">Barang Keluar</h1>
    </div>

    <div class="bg-white border p-4 mt-3 shadow-md rounded-md">
      <h1 class="text-lg font-semibold px-8 pt-6">Data Penerima</h1>

      <form class="px-8 pt-6 pb-8">
        <div class="mb-5">
          <label
            for="recipientName"
            class="block text-gray-700 text-sm font-medium mb-2"
            >Nama Pemesan</label
          >
          <input
            id="recipientName"
            type="text"
            class="shadow-sm focus:border-blue-500 w-full rounded-md border border-slate-400 p-2"
            placeholder="Masukkan Nama Pemesan"
            required
          />
        </div>

        <div class="mb-5">
          <label
            for="recipientAddress"
            class="block text-gray-700 text-sm font-medium mb-2"
            >Alamat Pengiriman</label
          >
          <textarea
            id="recipientAddress"
            class="shadow-sm focus:border-blue-500 w-full rounded-md border border-slate-400 p-2"
            rows="5"
            placeholder="Masukkan Alamat Pengiriman"
            required
          ></textarea>
        </div>

        <div class="mt-4">
          <button
            type="submit"
            class="bg-blue-500 text-white font-medium rounded-md shadow-sm px-4 py-2 hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>

    <!-- Tabel untuk menampilkan data produk -->
    <div class="bg-white border p-4 mt-3 shadow-md rounded-md">
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="products"
        item-value="name"
        items-per-page="5"
        :loading="loading"
        return-object
        show-select
        color="primary"
        dense
      >
        <template #item="{ item, index }">
          <tr :class="diffRowColor(index)">
            <td class="pt-4 pl-2">
              <v-checkbox
                v-model="selected"
                :value="item"
                color="primary"
                dense
              ></v-checkbox>
            </td>
            <td>{{ item.namaProduk }}</td>
            <td>{{ item.harga }}</td>
            <td class="flex">
              <QuantityBtn></QuantityBtn>
            </td>
          </tr>
        </template>
      </v-data-table>
      <pre>{{ selected }}</pre>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/utils/api";
import QuantityBtn from "@/components/QuantityBtn.vue";

export default {
  components: {
    QuantityBtn,
  },
  data() {
    return {
      selected: [],
      headers: [
        {
          title: "Nama Produk",
          align: "start",
          key: "namaProduk",
          sortable: false,
        },
        { title: "Harga", align: "start", key: "harga" },
        {
          title: "Kuantitas",
          align: "start",
          key: "add",
          sortable: false,
        },
      ],
      products: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        // Menampilkan loading spinner
        this.loading = true;
        const response = await axiosInstance.get(
          "http://localhost:5000/products",
        );
        // Menghentikan loading spinner
        this.loading = false;
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
        // Menghentikan loading spinner dan menampilkan pesan kesalahan
        this.loading = false;
      }
    },
    diffRowColor(index) {
      return index % 2 === 0 ? "bg-gray-100" : "";
    },
  },
};
</script>

<style>
/* Styles khusus untuk komponen ini */
</style>
