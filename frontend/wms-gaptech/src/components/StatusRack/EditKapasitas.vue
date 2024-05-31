<template>
  <v-card v-show="!showAlert">
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-card-title>Edit Kapasitas Rak</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="rak.rak"
            label="Rak"
            readonly
            class="cursor-not-allowed"
          ></v-text-field>
          <v-text-field
            v-model="rak.terisi"
            label="Terisi"
            readonly
            class="cursor-not-allowed"
          ></v-text-field>
          <v-text-field
            v-model="rak.kapasitas"
            label="Kapasitas"
            type="number"
            :rules="[rules.required, rules.number]"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <div class="flex justify-end items-center p-3 gap-2">
        <ComponentButton intent="primary" @click="saveKapasitas(rak)"
          >Simpan</ComponentButton
        >
        <ComponentButton intent="danger" @click="cancel">Batal</ComponentButton>
      </div>
    </div>
  </v-card>
  <ShowAlert v-show="showAlert">Rak tidak ditemukan!</ShowAlert>
  <Notification ref="notification" />
</template>

<script>
import Notification from "../Notification.vue";
import axiosInstance from "@/utils/api";
import ComponentButton from "../ComponentButton.vue";
import ShowAlert from "../ShowAlert.vue";

export default {
  components: {
    Notification,
    ComponentButton,
    ShowAlert,
  },
  data() {
    return {
      rak: {
        rak: "",
        kapasitas: 0,
        terisi: 0,
      },
      rules: {
        required: (value) => !!value || "Field is required",
        number: (value) => !isNaN(value) || "Must be a number",
      },
      loading: false,
      showAlert: false,
    };
  },
  created() {
    this.fetchRakDetails();
  },
  methods: {
    async fetchRakDetails() {
      this.loading = true;
      this.showAlert = false;
      const rakId = this.$route.params.rakId;
      setTimeout(async () => {
        try {
          const response = await axiosInstance.get(`rack/${rakId}`);
          this.rak = response.data;
          this.loading = false;
        } catch (error) {
          this.loading = false;
          this.showAlert = true;
          console.error("Error:", error);
          this.$refs.notification.showError(error.response.data.msg);
        }
      }, 1000);
    },
    async saveKapasitas(updatedItem) {
      try {
        await axiosInstance.patch(`rack/${updatedItem.rak}`, {
          kapasitas: updatedItem.kapasitas,
        });
        this.$refs.notification.showSuccess("Berhasil mengubah kapasitas!");
        setTimeout(() => {
          this.$router.push("/status-rak");
        }, 2000);
      } catch (error) {
        console.error("API Error:", error);
        this.$refs.notification.showError(error.response.data.msg);
      }
    },
    cancel() {
      const isConfirmed = window.confirm(
        "Apakah Anda yakin tidak menyimpan perubahan?",
      );
      if (isConfirmed) {
        this.$router.push("/status-rak");
      }
    },
  },
};
</script>

<style scoped></style>
