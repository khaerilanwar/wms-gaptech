<template>
  <div class="bg-white p-4 h-full border rounded border-black">
    <!-- Loader -->
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>

    <!-- Content -->
    <div v-else>
      <div class="flex justify-end m-2">
        <router-link to="/riwayat-transaksi">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
              clip-rule="evenodd"
            />
          </svg>
        </router-link>
      </div>
      <p
        class="flex justify-center font-mono items-center font-semibold text-3xl mt-10"
      >
        DETAIL RIWAYAT TRANSAKSI
      </p>

      <div class="flex flex-col mt-14 mb-10 ml-15 gap-3">
        <div class="flex flex-row">
          <p class="font-medium">ID Transaksi :</p>
          <p class="ml-2">{{ products.idTransaksi }}</p>
        </div>
        <div class="flex flex-row">
          <p class="font-medium">Nama Pemesan :</p>
          <p class="ml-2">{{ products.namaPemesan }}</p>
        </div>
        <div class="flex flex-row">
          <p class="font-medium">Alamat Pengiriman :</p>
          <p class="ml-2">{{ products.alamatPengiriman }}</p>
        </div>
      </div>

      <v-table class="px-12">
        <thead>
          <tr class="border">
            <th class="text-center border">No</th>
            <th class="text-center border">ID Barang</th>
            <th class="text-center border">Nama Barang</th>
            <th class="text-center border">Jumlah Pesanan</th>
            <th class="text-center border">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in products.barangKeluar"
            :key="index"
            :class="diffRowColor(index)"
            class="border"
          >
            <td class="text-center border">{{ index + 1 }}</td>
            <td class="text-center border">{{ item.kodeProduk }}</td>
            <td class="text-center border">{{ item.namaProduk }}</td>
            <td class="text-center border">{{ item.kuantitas }}</td>
            <td class="text-center border">
              {{ $filters.currency(item.subTotal) }}
            </td>
          </tr>
        </tbody>
      </v-table>

      <p class="mt-16 mb-10 ml-15 font-bold text-center">
        Jumlah Transaksi : {{ $filters.currency(totalHarga) }}
      </p>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/utils/api";

export default {
  data() {
    return {
      products: [],
      totalHarga: 0,
      isLoading: true,
    };
  },
  created() {
    setTimeout(() => {
      this.fetchTransactionData();
    }, 1000);
  },
  methods: {
    async fetchTransactionData() {
      try {
        const idTransaksi = this.$route.params.idTransaksi;
        const response = await axiosInstance.get(`transaction/${idTransaksi}`);
        this.products = response.data;
        this.totalHarga = this.products.barangKeluar.reduce(
          (total, item) => total + item.subTotal,
          0,
        );
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    },
    diffRowColor(index) {
      return (index + 1) % 2 !== 0 ? "bg-slate-100" : "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
