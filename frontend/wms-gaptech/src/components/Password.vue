<template>
  <section>
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
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
            Pengaturan Kata Sandi
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
                >Email</label
              >
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
            <button
              type="submit"
              class="w-full text-white bg-blue-primary hover:bg-blue-secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Kirim
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axiosInstance from "@/utils/api";
export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async handleSubmit() {
      await axiosInstance.post("setting", {
        email: this.email,
      });
    },
  },
};
</script>

<style scoped></style>
