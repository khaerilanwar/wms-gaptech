<template>
  <div class="rounded-lg shadow-lg p-5 bg-white">
    <h1 class="font-semibold xl:text-2xl">Ringkasan Barang Masuk dan Keluar</h1>
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
      chartData: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
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
  mounted() {
    this.fetchData();
  },
  methods: {
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
    async fetchData() {
      try {
        const inProducts = await axiosInstance.get(
          "inproducts/data-by-period?start=2024-01-01&end=2024-12-31",
        );
        const outProducts = await axiosInstance.get(
          "outproducts/data-by-period?start=2024-01-01&end=2024-12-31",
        );

        this.updateChartData(inProducts.data, outProducts.data);
        console.log("In Products:", inProducts.data);
        console.log("Out Products:", outProducts.data);
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    },
  },
};
</script>
