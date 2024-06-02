<template>
  <section>
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 font-Montserrat"
    >
      <div
        class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border-2 border-blue-primary"
      >
        <div class="p-3">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl mb-2"
          >
            Ganti Kata Sandi
          </h1>
          <form
            class="space-y-2 md:space-y-2"
            action=""
            method="post"
            @submit.prevent="handleSubmit"
          >
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-black"
                >Kata Sandi <span class="text-red-secondary">*</span></label
              >
              <div class="relative flex items-center w-full">
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  name="password"
                  placeholder="••••••••"
                  autocomplete="off"
                  class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary pr-10"
                  required
                />
                <span
                  class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  @click="toggleShowPassword"
                >
                  <div v-if="showPassword">
                    <EyeIcon class="h-4 w-4" />
                  </div>
                  <div v-else><EyeSlashIcon class="h-4 w-4" /></div>
                </span>
              </div>
            </div>
            <div>
              <label
                for="confirm_password"
                class="block mb-2 text-sm font-medium text-black"
                >Konfirmasi Kata Sandi
                <span class="text-red-secondary">*</span></label
              >
              <div class="relative flex items-center w-full">
                <input
                  id="confirm_password"
                  v-model="confirm_password"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  name="confirm_password"
                  placeholder="••••••••"
                  autocomplete="off"
                  class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary"
                  required
                />
                <span
                  class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  @click="toggleShowConfirmPassword"
                >
                  <div v-if="showConfirmPassword">
                    <EyeIcon class="h-4 w-4" />
                  </div>
                  <div v-else><EyeSlashIcon class="h-4 w-4" /></div>
                </span>
              </div>
            </div>
            <ComponentButton intent="primary_full_width" :disabled="isLoading">
              {{ isLoading ? "Loading..." : "Kirim" }}
            </ComponentButton>
          </form>
        </div>
      </div>
    </div>
    <Notification ref="notification" />
  </section>
</template>

<script>
import ComponentButton from ".././ComponentButton.vue";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
import Notification from "../Notification.vue";
import axiosInstance from "@/utils/api";
export default {
  components: {
    ComponentButton,
    EyeIcon,
    EyeSlashIcon,
    Notification,
  },
  props: {
    token: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      password: "",
      confirm_password: "",
      showPassword: false,
      showConfirmPassword: false,
      isLoading: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.isLoading = true;
        const response = await axiosInstance.put("update-password", {
          newPassword: this.password,
          confirmNewPassword: this.confirm_password,
        });
        this.$refs.notification.showSuccess(response.data.msg);
        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        this.$refs.notification.showError(error.response.data.msg);
      }
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    toggleShowConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
  },
};
</script>

<style lang="scss" scoped></style>
