<template>
  <div>
    <LoginView />
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
// import LoginView from "./views/LoginView.vue";

export default {
  async created() {
    const response = await axios.get("user");
    this.$store.dispatch("user", response.data);
  },
};
</script>
