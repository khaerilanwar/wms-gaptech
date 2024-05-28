<template>
  <v-card>
    <v-card-title>Edit Kapasitas Rak</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field v-model="rak.rak" label="Rak" readonly></v-text-field>
        <v-text-field
          v-model="rak.kapasitas"
          label="Kapasitas"
          type="number"
          :rules="[rules.required, rules.number]"
        ></v-text-field>
        <v-text-field v-model="rak.terisi" label="Terisi" type="number" readonly></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="saveKapasitas(rak)">Simpan</v-btn>
      <v-btn @click="$router.back()">Batal</v-btn>
    </v-card-actions>
  </v-card>
  <Notification ref="notification" />
</template>

<script>
import Notification from "../Notification.vue";
import axiosInstance from "@/utils/api";

export default {
  components: {
    Notification,
  },
  data() {
    return {
      rak: {
        rak: '',
        kapasitas: 0,
        terisi: 0,
      },
      rules: {
        required: value => !!value || 'Field is required',
        number: value => !isNaN(value) || 'Must be a number',
      },
    };
  },
  created() {
    this.fetchRakDetails();
  },
  methods: {
    async fetchRakDetails() {
      const rakId = this.$route.params.rakId;
      try {
        const response = await axiosInstance.get(`rack/${rakId}`);
        this.rak = response.data;
      } catch (error) {
        console.error('Error:', error);
        this.$refs.notification.showError("Gagal memuat detail rak");
      }
    },
    async saveKapasitas(updatedItem) {
      console.log('Updated Item:', updatedItem);
      try {
        const response = await axiosInstance.patch(`rack/${updatedItem.rak}`, {
          kapasitas: updatedItem.kapasitas,
        });
        console.log('API Response:', response);
        this.$refs.notification.showSuccess("Berhasil mengubah kapasitas");
        this.$router.back(); // Kembali setelah berhasil menyimpan
      } catch (error) {
        console.error('API Error:', error);
        this.$refs.notification.showError("Gagal mengubah kapasitas");
      }
    },
  },
};
</script>

<style scoped>

</style>
