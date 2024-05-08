<template>
  <div class="rounded-lg space-y-2 flex flex-col h-full">
    <div
      class="bg-white p-2 shadow-lg rounded-lg h-1/2 flex flex-col justify-between"
    >
      <div class="ml-2 mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#366B9A"
          class="w-10 h-10 border-2 p-1 bg-blue-100 rounded"
        >
          <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
          <path
            fill-rule="evenodd"
            d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z"
            clip-rule="evenodd"
          />
          <path
            d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z"
          />
        </svg>

        <h1 class="font-semibold text-lg mt-2">Pemasukan/bulan</h1>
        <p
          class="font-extrabold text-2xl lg:text-4xl flex justify-center items-center mt-5"
        >
          {{ $filters.currency(monthlyData.income[4]) }}
        </p>
      </div>
      <!-- pengen nambahin kenaikan dibanding dengan minggu lalu -->
    </div>

    <div class="flex flex-row space-x-2 flex-grow">
      <div
        class="bg-white p-3 shadow-lg rounded-lg w-1/2 flex flex-col justify-between"
      >
        <div class="ml-2 mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#366B9A"
            class="w-10 h-10 border-2 p-1 bg-blue-100 rounded"
          >
            <path
              d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
            />
          </svg>
          <h1 class="font-semibold text-lg mt-3">Transaksi/bulan</h1>
          <p
            class="font-extrabold text-2xl lg:text-3xl flex justify-between items-end mt-2"
          >
            {{ monthlyData.transaction[4] }}
          </p>
        </div>
      </div>

      <div
        class="bg-white p-3 shadow-lg rounded-lg w-1/2 flex flex-col justify-between"
      >
        <div class="ml-2 mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#366B9A"
            class="w-10 h-10 border-2 p-1 bg-blue-100 rounded"
          >
            <path
              fill-rule="evenodd"
              d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.54 15h6.42l.5 1.5H8.29l.5-1.5Zm8.085-8.995a.75.75 0 1 0-.75-1.299 12.81 12.81 0 0 0-3.558 3.05L11.03 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 0 0 1.146-.102 11.312 11.312 0 0 1 3.612-3.321Z"
              clip-rule="evenodd"
            />
          </svg>

          <h1 class="font-semibold text-lg mt-3">Sales Goals</h1>
          <v-progress-linear
            color="primary"
            model-value="70"
            class="mt-3"
          ></v-progress-linear>
          <p class="text-sm mt-2 font-medium">54.795.000,00/75.000.000,00</p>
        </div>
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
