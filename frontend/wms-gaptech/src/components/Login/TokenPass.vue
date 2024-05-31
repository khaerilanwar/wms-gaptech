<template>
  <div v-show="!isValid" class="flex items-center justify-center mt-10">
    <img src="../../../reset-pass.png" alt="" srcset="" class="w-36" />
    <span
      ><h1 class="text-xl font-semibold">Tunggu dulu ya...</h1>
      <p>
        Setelah ini, anda akan diarahkan ke halaman untuk konfirmasi password
      </p></span
    >
  </div>
  <ResetPassword v-show="isValid" :token="token"></ResetPassword>
  <Notification ref="notification" />
</template>

<script>
import axiosInstance from "@/utils/api";
import ResetPassword from "./ResetPassword.vue";
import Notification from "../Notification.vue";
export default {
  components: {
    Notification,
    ResetPassword,
  },
  data() {
    return {
      token: "",
      isValid: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const token = this.$route.params.token;
        setTimeout(async () => {
          try {
            const response = await axiosInstance.get(
              `verify-reset-token/${token}`,
            );
            this.isValid = response.data.isValid;
            this.token = token;
          } catch (error) {
            this.loading = false;
            this.showAlert = true;
            console.log(error);
            this.$refs.notification.showError(error.response.data.msg);
          }
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
