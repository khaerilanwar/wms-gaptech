<template>
  <div class="p-3 h-full">
    <!-- Loader -->
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>

    <div v-else>
      <button
        class="flex items-center hover:text-blue-primary mb-3"
        @click="goBack"
      >
        <ChevronLeftIcon class="h-6 w-6" />
        <span class="text-sm">Kembali</span>
      </button>
      <div class="bg-white border p-4 shadow-md rounded-md">
        <h1 class="text-xl font-semibold">Edit Transaksi</h1>
      </div>

      <form @submit.prevent="">
        <div class="bg-white border p-8 mt-3 shadow-md rounded-md">
          <h1 class="text-lg font-semibold pb-5 pt-2">Data Penerima</h1>
          <div class="mb-5">
            <label
              for="recipientName"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Nama Pemesan</label
            >
            <input
              id="recipientName"
              v-model="recipientName"
              type="text"
              class="mb-3 shadow-sm focus:border-blue-700 w-full rounded-md border border-blue-500 p-2"
              placeholder="Masukkan Nama Pemesan"
              readonly
            />
          </div>
          <div class="mb-5">
            <label
              for="recipientAddress"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Alamat Pengiriman</label
            >
            <textarea
              id="recipientAddress"
              v-model="recipientAddress"
              class="mb-2 shadow-sm focus:border-blue-700 w-full rounded-md border border-blue-500 p-2"
              rows="5"
              placeholder="Masukkan Alamat Pengiriman"
              readonly
            ></textarea>
          </div>

          <label class="block text-gray-700 text-sm font-bold mb-2 ml-1"
            >Daftar Pesanan</label
          >
          <v-table class="mb-8 border-2">
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
                v-for="(item, index) in barangKeluar"
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

          <label class="block text-gray-700 text-sm font-bold mb-2 ml-1"
            >Status Pengiriman</label
          >
          <v-select
            placeholder="Status Pengiriman"
            :items="[
              'California',
              'Colorado',
              'Florida',
              'Georgia',
              'Texas',
              'Wyoming',
            ]"
            variant="outlined"
          ></v-select>
        </div>
      </form>
    </div>
  </div>
  <Notification ref="notification" />
</template>

<script>
import axiosInstance from "@/utils/api";
import Notification from "@/components/Notification.vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";

export default {
  components: {
    Notification,
    ChevronLeftIcon,
  },
  data() {
    return {
      recipientName: "",
      recipientAddress: "",
      barangKeluar: [],
      status: "",
      totalHarga: 0,
      isLoading: true,
    };
  },
  created() {
    this.fetchTransactionData();
  },

  methods: {
    async fetchTransactionData() {
      try {
        const idTransaksi = this.$route.params.idTransaksi;
        const response = await axiosInstance.get(`transaction/${idTransaksi}`);
        const data = response.data;
        console.log(data);
        this.recipientName = data.namaPemesan;
        this.recipientAddress = data.alamatPengiriman;
        this.barangKeluar = data.barangKeluar;
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      } finally {
        this.isLoading = false;
      }
    },

    goBack() {
      const isConfirmed = window.confirm(
        "Apakah Anda yakin ingin meninggalkan halaman ini?",
      );
      if (isConfirmed) {
        this.$router.push("/daftar-transaksi");
      }
    },

    diffRowColor(index) {
      return (index + 1) % 2 !== 0 ? "bg-slate-100" : "";
    },
  },
};
</script>

<style scoped>
/* Tambahkan styling sesuai kebutuhan Anda */
</style>
