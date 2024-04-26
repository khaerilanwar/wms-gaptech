<template>
  <div class="space-y-2">
    <p>Pilih periode tanggal</p>
    <div class="flex items-center">
      <div class="relative">
        <input
          v-model="startDate"
          name="start"
          type="date"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-primary focus:border-blue-primary block w-full py-2.5"
          placeholder="Pilih tanggal mulai"
        />
      </div>
      <span class="mx-4 text-gray-500">hingga</span>
      <div class="relative mr-5">
        <input
          v-model="endDate"
          name="start"
          type="date"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-primary focus:border-blue-primary block w-full py-2.5"
          placeholder="Pilih tanggal mulai"
        />
      </div>
      <ComponentButton intent="primary" @click="handleGetData"
        >Ambil Data
      </ComponentButton>
    </div>
  </div>
  <Notification ref="notification" />
</template>

<script>
import Notification from "../Notification.vue";
import ComponentButton from "../ComponentButton.vue";
export default {
  components: { Notification, ComponentButton },
  data() {
    return {
      startDate: null,
      endDate: null,
    };
  },
  methods: {
    handleGetData() {
      if (this.startDate && this.endDate) {
        if (new Date(this.startDate) > new Date(this.endDate)) {
          this.$refs.notification.showError(
            "Tanggal mulai harus lebih kecil dari tanggal akhir",
          );
          return;
        }
      } else {
        this.$refs.notification.showError(
          "Isi tanggal mulai dan tanggal akhir terlebih dahulu",
        );
      }
      console.log("Periode tanggal yang dipilih:", {
        startDate: this.startDate,
        endDate: this.endDate,
      });
    },
  },
};
</script>
