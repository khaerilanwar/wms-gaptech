<template>
    <v-card>
      <v-card-title>Edit Kapasitas Rak</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="rak.rak"
            label="Rak"
            readonly
          ></v-text-field>
          <v-text-field
            v-model="rak.kapasitas"
            label="Kapasitas"
            type="number"
            :rules="[rules.required, rules.number]"
          ></v-text-field>
          <v-text-field
            v-model="rak.terisi"
            label="Terisi"
            type="number"
            readonly
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="saveKapasitas">Simpan</v-btn>
        <v-btn @click="$router.back()">Batal</v-btn>
      </v-card-actions>
    </v-card>
    <Notification ref="notification" />
  </template>
  
  <script>
  import axiosInstance from "@/utils/api";
  import Notification from "../Notification.vue";
  
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
      async saveKapasitas() {
        if (this.$refs.form.validate()) {
          try {
            await axiosInstance.patch(`rack/${this.rak.rak}`, {
              kapasitas: this.rak.kapasitas,
            });
            this.$refs.notification.showSuccess("Kapasitas berhasil diubah");
            this.$router.back();
          } catch (error) {
            console.error('Error:', error);
            this.$refs.notification.showError("Gagal mengubah kapasitas");
          }
        }
      },
    },
  };
  </script>
  