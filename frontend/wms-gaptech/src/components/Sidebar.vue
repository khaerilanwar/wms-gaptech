<template>
  <div class="relative flex min-h-screen">
    <div
      class="text-black w-64 px-3 absolute inset-y-0 left-0 md:relative md:-translate-x-0 transform -translate-x-full transition duration-200 ease-in-out"
      :class="{ 'relative translate-x-0': showSidebar }"
    >
      <a
        href="#"
        class="flex items-center text-2xl font-semibold text-black space-x-2 px-4 py-3"
      >
        <img
          class="w-8 h-8 mr-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        <span class="text-2xl font-extrabold text-blue-primary">GapTech</span>
      </a>
      <nav>
        <router-link
          to="/"
          class="flex items-center py-3 px-4 space-x-2 hover:bg-blue-light hover:text-blue-primary rounded transition duration-200"
          :class="{ sidebar_active: isActive('/') }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <span class="text-sm">Dashboard</span>
        </router-link>
        <router-link
          to="/barang-masuk"
          class="flex items-center py-3 px-4 space-x-2 hover:bg-blue-light hover:text-blue-primary rounded transition duration-200"
          :class="{ sidebar_active: isActive('/barang-masuk') }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6Zm-5.03 4.72a.75.75 0 0 0 0 1.06l1.72 1.72H2.25a.75.75 0 0 0 0 1.5h10.94l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0Z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-sm">Barang Masuk</span>
        </router-link>
        <router-link
          to="/barang-keluar"
          class="flex items-center py-3 px-4 space-x-2 hover:bg-blue-light hover:text-blue-primary rounded transition duration-200"
          :class="{ sidebar_active: isActive('/barang-keluar') }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-sm">Barang Keluar</span>
        </router-link>
        <router-link
          to="/status-rak"
          class="flex items-center py-3 px-4 space-x-2 hover:bg-blue-light hover:text-blue-primary rounded transition duration-200"
          :class="{ sidebar_active: isActive('/status-rak') }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
          <span class="text-sm">Status Rak</span>
        </router-link>
      </nav>
    </div>
    <div class="flex-1">
      <div class="bg-white px-3 py-4 flex items-center justify-between">
        <button @click="showSidebar = !showSidebar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div>
          <p v-if="user">{{ user.username }}</p>
          <a href="javascript:void(0)" @click="handleClick">Logout</a>
        </div>
      </div>
      <!-- <div class="h-[calc(100vh-50px)] bg-pink-400 p-[20px]">
        <router-view />
      </div> -->
      <div class="flex-1 bg-white p-3 h-full border rounded border-black mx-3">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { mapGetters } from "vuex";

export default {
  setup() {
    const route = useRoute();
    const showSidebar = ref(false);

    return {
      showSidebar,
      isActive(path) {
        return route.path === path;
      },
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  method: {
    handleClick() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>
