import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import LoginView from "@/views/LoginView.vue";
import BarangMasukView from "@/views/BarangMasukView.vue";
import Sidebar from "@/components/Sidebar.vue";
import BarangKeluarView from "@/views/BarangKeluar/BarangKeluarView.vue";
import StatusRakView from "@/views/StatusRakView.vue";
import DetailBrgKeluar from "@/views/BarangKeluar/DetailBrgKeluar.vue";
import TambahBrgKeluar from "@/views/BarangKeluar/TambahBrgKeluar.vue";
import Password from "@/components/Password.vue";
import ResetPassword from "@/components/ResetPassword.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/pengaturan-kata-sandi",
    name: "pengaturan-kata-sandi",
    component: Password,
  },
  // {
  //   path: "/ganti-kata-sandi/:token",
  //   name: "ganti-kata-sandi",
  //   component: ResetPassword,
  // },
  {
    path: "/ganti-kata-sandi",
    name: "ganti-kata-sandi",
    component: ResetPassword,
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
