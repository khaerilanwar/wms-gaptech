<template>
  <div class="rounded-lg space-y-2 flex flex-col h-full">
    <div
      class="bg-white p-3 shadow-lg rounded-lg h-1/2 flex flex-col justify-between"
    >
      <h1 class="font-semibold xl:text-2xl">Pemasukan/bulan</h1>
      <div class="flex justify-between items-end">
        <p class="font-extrabold text-2xl lg:text-3xl xl:text-5xl">
          {{ $filters.currency(monthlyData.income[4]) }}
        </p>
      </div>
      <!-- pengen nambahin kenaikan dibanding dengan minggu lalu -->
    </div>
    <div
      class="bg-white p-3 shadow-lg rounded-lg h-1/2 flex flex-col justify-between"
    >
      <h1 class="font-semibold xl:text-2xl">Transaksi/bulan</h1>
      <div class="flex justify-between items-end">
        <p class="font-extrabold text-2xl lg:text-3xl xl:text-5xl">
          {{ monthlyData.transaction[4] }}
        </p>
        <span class="xl:text-3xl">invoice</span>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/utils/api";

export default {
  data() {
    return {
      monthlyData: {
        income: {},
        transaction: {},
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axiosInstance.get("transactions");
        this.monthlyReport(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    },
    monthlyReport(transactions) {
      transactions.forEach((transaction) => {
        const month = new Date(transaction.tanggalTransaksi).getMonth(); // Mengambil bulan dari 1 hingga 12
        console.log(month);

        if (!this.monthlyData.income[month]) {
          this.monthlyData.income[month] = 0;
        }
        if (!this.monthlyData.transaction[month]) {
          this.monthlyData.transaction[month] = 0;
        }

        this.monthlyData.income[month] += transaction.totalHarga;
        this.monthlyData.transaction[month] += 1;
      });
      console.log("Monthly Data:", this.monthlyData);
    },
  },
};
</script>

<style lang="scss" scoped></style>
