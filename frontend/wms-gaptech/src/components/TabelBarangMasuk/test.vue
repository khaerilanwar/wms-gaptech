<template>
  <div>
    <h1>User Information</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/utils/api";

export default {
  data() {
    return {
      loading: true,
      error: null,
      user: null,
    };
  },
  async mounted() {
    try {
      const response = await axiosInstance.get("user");
      this.user = response.data.user;
    } catch (error) {
      this.loading = false;
      this.error = "Failed to fetch user data";
      console.error("Error fetching user data:", error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style lang="scss" scoped>
h1 {
  color: #333;
}
</style>
