<template>
  <PuSkeleton v-if="loading" height="250px"> </PuSkeleton>
  <div v-else class="rounded-lg shadow-lg p-2 h-full bg-white">
    <Bar :data="chartData" />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import axiosInstance from "@/utils/api";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      loading: false,
      chartData: {
        labels: [
          "Januari",
          "Februari",
          "Maret",
          "April",
          "Mei",
          "Juni",
          "Juli",
          "Agustus",
          "September",
          "Oktober",
          "November",
          "Desember",
        ],
        datasets: [
          {
            label: "Barang Masuk",
            backgroundColor: "rgba(66, 125, 157, 1)",
            data: Array(12).fill(0),
          },
          {
            label: "Barang Keluar",
            backgroundColor: "rgba(155, 190, 200, 1)",
            data: Array(12).fill(0),
          },
        ],
      },
    };
  },
  created() {
    console.log("Component created");
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        console.log("Fetching data...");
        this.loading = true;
        const year = this.currentYear;
        console.log(year);
        const inProducts = await axiosInstance.get(
          `inproducts/data-by-period?start=${year}-01-01&end=${year}-12-31`,
        );
        const outProducts = await axiosInstance.get(
          `outproducts/data-by-period?start=${year}-01-01&end=${year}-12-31`,
        );
        this.updateChartData(inProducts.data, outProducts.data);
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      } catch (error) {
        this.loading = false;
        console.error("Error fetching data:", error);
      }
    },
    updateChartData(inProducts, outProducts) {
      inProducts.forEach((item) => {
        const date = new Date(item.dateInProduct);
        const month = date.getMonth();
        this.chartData.datasets[0].data[month] += item.stokMasuk;
      });

      outProducts.forEach((item) => {
        const date = new Date(item.dateOutProduct);
        const month = date.getMonth();
        this.chartData.datasets[1].data[month] += item.stokKeluar;
      });
    },
  },
};
</script>
