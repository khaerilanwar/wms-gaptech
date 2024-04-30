<template>
  <div class="rounded-lg shadow-lg p-5 bg-white">
    <h1 class="font-semibold">Ringkasan Barang Masuk dan Keluar</h1>
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
          "January",
          "February",
          "March",
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
            backgroundColor: "rgba(66, 125, 157, 1)", // Warna yang lebih transparan untuk membedakan dengan barang keluar
            data: [40, 20, 12, 40, 20, 12, 40, 20, 12, 40, 20, 12],
          },
          {
            label: "Barang Keluar",
            backgroundColor: "rgba(155, 190, 200, 1)", // Warna yang lebih transparan untuk membedakan dengan barang masuk
            data: [20, 30, 15, 25, 10, 15, 30, 20, 15, 25, 30, 20],
          },
        ],
      },
    };
  },
};
</script>
