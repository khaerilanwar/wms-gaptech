<template>
  <v-card>
    <!-- your template code -->
  </v-card>
</template>

<script>
import Notification from "@/components/Notification.vue";
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
      notification: null, 
    };
  },
  created() {
    this.fetchRakDetails();
    this.notification = this.$refs.notification; // inisialisasi referensi notifikasi setelah komponen dimuat
  },
  methods: {
    async saveKapasitas() {
      if (this.$refs.form.validate()) {
        try {
          await axiosInstance.patch(`rack/${this.rak.rak}`, {
            kapasitas: this.rak.kapasitas,
          });
          if (this.notification) {
            this.notification.showSuccess("Kapasitas berhasil diubah");
          }
          this.$router.back();
        } catch (error) {
          console.error('Error:', error);
          if (this.notification) {
            this.notification.showError("Gagal mengubah kapasitas");
          }
        }
      }
    },
    cancel() {
      const isConfirmed = window.confirm(
        "Apakah Anda yakin tidak menyimpan perubahan?",
      );
      if (isConfirmed) {
        this.$router.back();
      }
    },
    fetchRakDetails() {
      // kode untuk mengambil detail rak
    },
  },
};
</script>

<style scoped>

</style>