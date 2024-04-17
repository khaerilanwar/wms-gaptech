<template>
  <div
    class="max-w-[1640px] mx-auto relative flex min-h-screen font-Montserrat"
  >
    <!-- sidebar kiri -->
    <div :class="sidebarClasses" class="bg-white text-black w-64 px-3 z-10">
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
          exact
          class="flex items-center py-3 px-4 space-x-2 hover:bg-blue-light hover:text-blue-primary rounded transition duration-200"
          :class="{ sidebar_active: isActive('/') }"
        >
          <HomeIcon class="h-6 w-6" />
          <span class="text-sm">Dashboard</span>
        </router-link>
        <router-link
          to="/barang-masuk"
          class="flex items-center py-3 px-4 space-x-2 hover:bg-blue-light hover:text-blue-primary rounded transition duration-200"
          :class="{ sidebar_active: isActive('/barang-masuk') }"
        >
          <ArrowRightEndOnRectangleIcon class="h-6 w-6" />
          <span class="text-sm">Barang Masuk</span>
        </router-link>
        <router-link
          to="/barang-keluar"
          class="flex items-center py-3 px-4 space-x-2 hover:bg-blue-light hover:text-blue-primary rounded transition duration-200"
          :class="{ sidebar_active: isActive('/barang-keluar') }"
        >
          <ArrowRightStartOnRectangleIcon class="h-6 w-6" />
          <span class="text-sm">Barang Keluar</span>
        </router-link>
        <router-link
          to="/status-rak"
          class="flex items-center py-3 px-4 space-x-2 hover:bg-blue-light hover:text-blue-primary rounded transition duration-200"
          :class="{ sidebar_active: isActive('/status-rak') }"
        >
          <InboxStackIcon class="h-6 w-6" />
          <span class="text-sm">Status Rak</span>
        </router-link>
      </nav>
    </div>
    <!-- header atas -->
    <div class="flex-1" :class="{ 'ml-64': !isMobile }">
      <div
        class="px-3 py-4 flex items-center justify-between"
        :class="{ 'ml-64': showSidebar && isMobile }"
      >
        <button @click="showSidebar = !showSidebar">
          <Bars3Icon class="h-6 w-6" />
        </button>
        <div class="flex gap-4">
          <p v-if="user">Hai, {{ user.name }}</p>
          <a href="javascript:void(0)" @click="handleClick">Logout</a>
        </div>
      </div>
      <div class="flex-1 bg-blue-bg p-3 h-full">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/utils/api";
import {
  HomeIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  InboxStackIcon,
  Bars3Icon,
} from "@heroicons/vue/24/outline";

export default {
  components: {
    HomeIcon,
    ArrowRightEndOnRectangleIcon,
    ArrowRightStartOnRectangleIcon,
    InboxStackIcon,
    Bars3Icon,
  },
  setup() {
    const route = useRoute();
    const showSidebar = ref(false);
    const screenWidth = computed(() => window.innerWidth);
    const isMobile = computed(() => screenWidth.value <= 768);

    const sidebarClasses = computed(() => {
      if (isMobile.value) {
        return {
          absolute: true,
          "inset-y-0": true,
          "left-0": true,
          "md:relative": true,
          "md:-translate-x-0": true,
          transform: "translate-x-full",
          transition: "duration-200",
          "ease-in-out": true,
          "-translate-x-full": !showSidebar.value,
        };
      } else {
        return {
          fixed: true,
          "z-50": true,
          "top-0": true,
          "h-full": true,
          "overflow-y-auto": true,
          "shadow-md": true,
          "max-h-full": true,
          relative: false,
          "translate-x-0": false,
          transition: "duration-200",
          "ease-in-out": true,
        };
      }
    });

    const updateScreenWidth = () => {
      screenWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", updateScreenWidth);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", updateScreenWidth);
    });
    return {
      showSidebar,
      sidebarClasses,
      isMobile,
      isActive(path) {
        if (route.path === path) {
          return true;
        }

        if (route.path.startsWith(path + "/") && path !== "/") {
          return true;
        }

        return false;
      },
    };
  },
  data() {
    return {
      user: null,
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  async created() {
    try {
      const response = await axiosInstance.get("user");
      this.user = response.data.user;
    } catch (error) {
      console.error("Gagal mendapatkan data pengguna:", error);
    }
  },
  methods: {
    async handleClick() {
      await axiosInstance.delete("logout");
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    ...mapActions(["setUser"]),
  },
};
</script>
