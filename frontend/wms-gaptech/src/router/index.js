import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import LoginView from "@/views/LoginView.vue";
import BarangMasukView from "@/views/BarangMasukView.vue";
import Sidebar from "@/components/Sidebar.vue";
import BarangKeluarView from "@/views/BarangKeluarView.vue";
import StatusRakView from "@/views/StatusRakView.vue";
import DetailBrgKeluar from "@/views/DetailBrgKeluar.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/",
      name: "sidebar",
      component: Sidebar,
      children: [
        {
          path: "/",
          name: "dashboard",
          component: DashboardView,
        },
        {
          path: "/barang-masuk",
          name: "barang-masuk",
          component: BarangMasukView,
        },
        {
          path: "/barang-keluar",
          name: "barang-keluar",
          component: BarangKeluarView,
        },
        {
          path: "/status-rak",
          name: "status-rak",
          component: StatusRakView,
        },
        {
          path: "/barang-keluar/tambah-data",
          name: "tambah-data",
          component: DetailBrgKeluar,
        },
      ],
    },
  ],
});

export default router;
