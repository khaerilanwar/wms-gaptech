import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import LoginView from "@/views/LoginView.vue";
import BarangMasukView from "@/views/BarangMasukView.vue";
import Sidebar from "@/components/Sidebar.vue";
import BarangKeluarView from "@/views/BarangKeluarView.vue";
import StatusRakView from "@/views/StatusRakView.vue";
import DetailBrgKeluar from "@/views/DetailBrgKeluar.vue";
import TambahBrgKeluar from "@/views/TambahBrgKeluar.vue";
import { getToken } from "@/utils/api";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/",
    name: "sidebar",
    component: Sidebar,
    meta: { requiresAuth: true },
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
        path: "/barang-keluar/detail",
        name: "detail-barang-keluar",
        component: DetailBrgKeluar,
      },
      {
        path: "/barang-keluar/tambah-barang",
        name: "tambah-barang-keluar",
        component: TambahBrgKeluar,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem("token")) {
      next({ name: "login" });
      return;
    }

    try {
      await getToken();
      next();
    } catch (error) {
      console.error("Gagal memperbarui token:", error);
      next({ name: "login" });
    }
  } else {
    next();
  }
});

export default router;
