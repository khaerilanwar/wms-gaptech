<template>
  <section>
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 font-Montserrat"
    >
      <div class="flex items-center mb-3 text-2xl font-semibold text-black">
        <img
          class="w-8 h-8 mr-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        GapTech
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
              <input
                id="password"
                v-model="password"
                type="password"
                name="password"
                placeholder="••••••••"
                autocomplete="off"
                class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary"
                required
              />
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
import { HomeIcon } from "@heroicons/vue/24/outline";

export default {
  components: {
    Notification,
    ComponentButton,
  },
  data() {
    return {
      email: "",
      password: "",
      HomeIcon: HomeIcon,
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
  },
};
</script>
