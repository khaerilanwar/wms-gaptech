<template>
  <div class="flex justify-between p-2 rounded-lg bg-white shadow-lg">
    <div class="space-y-2">
      <p>Filter</p>
      <v-chip
        class="hover:bg-blue-primary hover:text-white"
        variant="outlined"
        :disabled="showPeriode"
        @click="toggleShow30DaysFilter"
        >30 hari terakhir
      </v-chip>
    </div>

    <div class="space-y-2">
      <p>Pilih periode tanggal manual</p>
      <div class="flex items-center">
        <div class="relative">
          <input
            v-model="startDate"
            name="start"
            type="date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-primary focus:border-blue-primary block w-full py-2.5 p-2"
            placeholder="Pilih tanggal mulai"
          />
        </div>
        <span class="mx-4 text-gray-500">hingga</span>
        <div class="relative mr-5">
          <input
            v-model="endDate"
            name="start"
            type="date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-primary focus:border-blue-primary block w-full py-2.5 p-2"
            placeholder="Pilih tanggal mulai"
          />
        </div>
        <ComponentButton
          intent="primary"
          :disabled="show30Days"
          @click="handleGetData"
        >
          Ambil Data
        </ComponentButton>
      </div>
    </div>
  </div>
  <div class="mt-5">
    <div class="flex items-center space-x-3 mb-5">
      <h2 v-show="show30Days || showPeriode" class="font-semibold py-3">
        Hasil Filter Data:
      </h2>
      <div>
        <v-chip
          v-show="show30Days"
          closable
          @click:close="toggleHide30DaysFilter"
        >
          30 hari terakhir
        </v-chip>
        <v-chip
          v-show="showPeriode"
          closable
          @click:close="toggleHidePeriodeFilter"
        >
          {{ formatDate(startDate) }} - {{ formatDate(endDate) }}
        </v-chip>
      </div>
    </div>
    <RiwayatInputTanggal
      v-show="showPeriode"
      :start-date="startDate"
      :end-date="endDate"
    ></RiwayatInputTanggal>
    <Riwayat30Hari v-show="show30Days"></Riwayat30Hari>
  </div>
  <ShowAlert v-show="!showPeriode && !show30Days"
    >Pilih Filter Terlebih Dahulu!
  </ShowAlert>
  <Notification ref="notification" />
</template>

<script>
import Notification from "../Notification.vue";
import ComponentButton from "../ComponentButton.vue";
import RiwayatInputTanggal from "./RiwayatInputTanggal.vue";
import Riwayat30Hari from "./Riwayat30Hari.vue";
import ShowAlert from "../ShowAlert.vue";

export default {
  components: {
    Notification,
    ComponentButton,
    RiwayatInputTanggal,
    Riwayat30Hari,
    ShowAlert,
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      showPeriode: false,
      show30Days: false,
    };
  },
  methods: {
    handleGetData() {
      const today = new Date();
      const currentDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );

      if (this.startDate && this.endDate) {
        const startDateObj = new Date(this.startDate);
        const endDateObj = new Date(this.endDate);

        const startDateWithoutTime = new Date(
          startDateObj.getFullYear(),
          startDateObj.getMonth(),
          startDateObj.getDate(),
        );
        const endDateWithoutTime = new Date(
          endDateObj.getFullYear(),
          endDateObj.getMonth(),
          endDateObj.getDate(),
        );

        if (
          startDateWithoutTime > currentDate ||
          endDateWithoutTime > currentDate
        ) {
          this.$refs.notification.showError(
            "Tanggal tidak boleh melebihi hari ini",
          );
          return;
        }
        if (new Date(this.startDate) > new Date(this.endDate)) {
          this.$refs.notification.showError(
            "Tanggal mulai harus lebih kecil dari tanggal akhir",
          );
          return;
        }
        this.showPeriode = true;
      } else {
        this.$refs.notification.showError(
          "Isi tanggal mulai dan tanggal akhir terlebih dahulu",
        );
      }
    },
    formatDate(date) {
      if (!date) return "";
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    toggleShow30DaysFilter() {
      this.show30Days = true;
    },
    toggleHide30DaysFilter() {
      this.show30Days = false;
    },
    toggleHidePeriodeFilter() {
      this.showPeriode = false;
    },
  },
};
</script>

<style scoped>
.v-text-field {
  width: 400px;
}
</style>
