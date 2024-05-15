<template>
  <div class="rounded-lg space-y-2 flex flex-col h-full">
    <div
      class="bg-white p-2 shadow-lg rounded-lg h-1/2 flex flex-col justify-between"
    >
      <div class="ml-2">
        <div class="flex justify-between items-end mt-3">
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
          <!-- Stats -->
          <div
            :class="[
              backgroundColor,
              'flex flex-row p-2 space-x-1 rounded-md mr-2',
            ]"
          >
            <svg
              v-if="isPercentageUp"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
              />
            </svg>

            <p class="text-sm">{{ percentageChange }}%</p>
          </div>
        </div>

        <h1 class="font-semibold text-lg mt-2">Pemasukan/bulan</h1>
        <p
          class="font-extrabold text-2xl lg:text-4xl flex justify-center items-center mt-5"
        >
          {{ $filters.currency(monthlyData.income[thisMonth]) }}
        </p>
      </div>
    </div>

    <div class="flex flex-row space-x-2 flex-grow">
      <div
        class="bg-white p-3 shadow-lg rounded-lg w-2/5 flex flex-col justify-between"
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
            {{ monthlyData.transaction[thisMonth] }}
          </p>
        </div>
      </div>

      <div
        class="bg-white p-3 shadow-lg rounded-lg w-3/5 flex flex-col justify-between"
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
            v-model="progressValue"
            color="primary"
            height="15"
            class="mt-1 mb-2"
          >
            <template #default="{ value }">
              <strong>{{ Math.round(value) }}%</strong>
            </template>
          </v-progress-linear>
          <p class="text-sm mt-2 font-medium">
            {{ $filters.currency(monthlyData.income[thisMonth]) }}/{{
              $filters.currency(salesGoals())
            }}
          </p>
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
      thisMonth: new Date().getMonth(),
      progressValue: 0,
      percentageChange: 0,
      isPercentageUp: false,
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
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    },
    monthlyReport(transactions) {
      transactions.forEach((transaction) => {
        const month = new Date(transaction.tanggalTransaksi).getMonth();

        if (!this.monthlyData.income[month]) {
          this.monthlyData.income[month] = 0;
        }
        if (!this.monthlyData.transaction[month]) {
          this.monthlyData.transaction[month] = 0;
        }

        this.monthlyData.income[month] += transaction.totalHarga;
        this.monthlyData.transaction[month] += 1;
      });
    },
    salesGoals() {
      const lastMonthIncome = this.monthlyData.income[this.thisMonth - 1] || 0;
      const targetGoals = lastMonthIncome * (30 / 100) + lastMonthIncome;
      return targetGoals;
    },
    thisMonthProgressSales() {
      const thisMonthIncome = this.monthlyData.income[this.thisMonth];
      this.progressValue = Math.round(
        (thisMonthIncome / this.salesGoals()) * 100,
      );
      const lastMonthIncome = this.monthlyData.income[this.thisMonth - 1] || 0;

      const percentage =
        ((thisMonthIncome - lastMonthIncome) / lastMonthIncome) * 100;
      this.percentageChange = Math.round(percentage);

      this.isPercentageUp = percentage > 0;

      if (this.isPercentageUp) {
        this.backgroundColor = "bg-emerald-100";
      } else {
        this.backgroundColor = "bg-red-200";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
