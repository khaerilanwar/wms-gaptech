<template>
  <section>
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 font-Montserrat"
    >
      <div class="flex items-center mb-4 text-2xl font-semibold text-black">
        <img class="w-10 h-8 mr-2" :src="gaptechLogo" alt="GapTech Logo" />
        GAPTECH
      </div>
      <div
        class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border-2 border-blue-primary"
      >
        <div class="p-3">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl mb-2"
          >
            Masuk Akun
          </h1>
          <form
            class="space-y-2 md:space-y-2"
            action=""
            method="post"
            @submit.prevent="handleSubmit"
          >
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-black"
                >Email <span class="text-red-secondary">*</span>
              </label>
              <input
                id="email"
                v-model="email"
                type="email"
                name="email"
                class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary"
                placeholder="johndoe@gmail.com"
                required
              />
            </div>
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
            <div class="grid place-items-end">
              <router-link
                to="pengaturan-kata-sandi"
                class="text-sm font-medium text-black hover:underline"
                >Lupa kata sandi?</router-link
              >
            </div>
            <ComponentButton intent="primary_full_width">Masuk</ComponentButton>
          </form>
        </div>
      </div>
    </div>
    <Notification ref="notification" />
  </section>
</template>

<script>
import axiosInstance from "@/utils/api";
import Notification from "../components/Notification.vue";
import ComponentButton from "../components/ComponentButton.vue";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
import gaptechLogo from "@/assets/gaptechlogo.png";

export default {
  components: {
    Notification,
    ComponentButton,
    EyeIcon,
    EyeSlashIcon,
  },
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      gaptechLogo, // Tambahkan gambar ke data
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axiosInstance.post("login", {
          email: this.email,
          password: this.password,
        });
        const token = response.data.accessToken;
        localStorage.setItem("token", token);
        this.$store.dispatch("setUser", response.data.user);
        console.log("accessToken", token);
        this.$router.push("/");
      } catch (error) {
        this.$refs.notification.showError(error.response.data.msg);
      }
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
.logo {
  width: 2rem; /* Atur lebar gambar sesuai keinginan Anda */
  height: 2rem; /* Atur tinggi gambar sesuai keinginan Anda */
  object-fit: contain; /* Memastikan gambar tidak terdistorsi */
}
</style>
