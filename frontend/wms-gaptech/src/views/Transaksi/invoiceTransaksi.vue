<template>
  <section class="font-Montserrat px-6 py-8 lg:py-0">
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>
    <div
      v-else
      v-show="!showAlert"
      class="bg-white p-4 w-5/6 border rounded border-black mx-auto max-w-[1640px] shadow-xl"
    >
      <p
        class="flex justify-center font-mono items-center font-semibold text-xl md:text-3xl"
      >
        E-Invoice
      </p>

      <div
        class="flex flex-col mb-5 gap-1 md:gap-3 mt-5 md:mt-10 text-xs md:text-lg"
      >
        <div class="flex flex-row">
          <p class="font-medium">
            ID Transaksi:
            <span class="font-normal">{{ invoice.idTransaksi }}</span>
          </p>
        </div>
        <div class="flex flex-row">
          <p class="font-medium">
            Nama Pemesan:
            <span class="font-normal">{{ invoice.namaPemesan }}</span>
          </p>
        </div>
        <div class="flex flex-row">
          <p class="font-medium">
            Alamat Pengirim:
            <span class="font-normal">{{ invoice.alamatPengiriman }}</span>
          </p>
        </div>
      </div>

      <div class="overflow-x-auto">
        <v-table class="min-w-full" density="compact">
          <thead>
            <tr class="border">
              <th class="text-center border px-2 py-1 text-xs md:text-base">
                No
              </th>
              <th class="text-center border px-2 py-1 text-xs md:text-base">
                ID Barang
              </th>
              <th class="text-center border px-2 py-1 text-xs md:text-base">
                Nama Barang
              </th>
              <th class="text-center border px-2 py-1 text-xs md:text-base">
                Jumlah Pesanan
              </th>
              <th class="text-center border px-2 py-1 text-xs md:text-base">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in invoice.barangKeluar"
              :key="index"
              :class="diffRowColor(index)"
              class="border"
            >
              <td class="text-center border px-2 py-1 text-xs md:text-base">
                {{ index + 1 }}
              </td>
              <td class="text-center border px-2 py-1 text-xs md:text-base">
                {{ item.kodeProduk }}
              </td>
              <td class="text-center border px-2 py-1 text-xs md:text-base">
                {{ item.namaProduk }}
              </td>
              <td class="text-center border px-2 py-1 text-xs md:text-base">
                {{ item.kuantitas }}
              </td>
              <td class="text-center border px-2 py-1 text-xs md:text-base">
                {{ $filters.currency(item.subTotal) }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <p class="font-medium mt-5 text-xs md:text-lg">
        Total Harga : {{ $filters.currency(totalHarga) }}
      </p>
    </div>

    <ShowAlert
      v-show="showAlert"
      class="flex justify-center items-center h-screen"
      >Transaksi tidak ditemukan!
    </ShowAlert>
  </section>
</template>

<script>
import axiosInstance from "@/utils/api";
import ShowAlert from "../../components/ShowAlert.vue";
export default {
  components: {
    ShowAlert,
  },
  data() {
    return {
      isLoading: false,
      showAlert: false,
      invoice: [],
      totalHarga: 0,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      this.showAlert = false;
      const idTransaksi = this.$route.params.idTransaksi;
      setTimeout(async () => {
        try {
          const response = await axiosInstance.get(
            `transaction/invoice/${idTransaksi}`,
          );
          this.invoice = response.data;
          this.totalHarga = this.invoice.barangKeluar.reduce(
            (total, item) => total + item.subTotal,
            0,
          );
          this.isLoading = false;
        } catch (error) {
          this.isLoading = false;
          this.showAlert = true;
          console.log(error);
        }
      }, 1000);
    },
    diffRowColor(index) {
      return (index + 1) % 2 !== 0 ? "bg-slate-100" : "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
