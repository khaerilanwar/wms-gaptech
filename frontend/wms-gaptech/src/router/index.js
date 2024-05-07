import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import LoginView from "@/views/LoginView.vue";
import BarangMasukView from "@/views/BarangMasuk/BarangMasukView.vue";
import Sidebar from "@/components/Sidebar.vue";
import BarangKeluarView from "@/views/BarangKeluar/BarangKeluarView.vue";
import StatusRakView from "@/views/StatusRakView.vue";
import DetailBrgKeluar from "@/views/BarangKeluar/DetailBrgKeluar.vue";
import TambahBrgKeluar from "@/views/BarangKeluar/TambahBrgKeluar.vue";
import Password from "@/components/Login/Password.vue";
import TambahBarangMasukView from "@/views/BarangMasuk/TambahBarangMasukView.vue";
import RiwayatBarangMasukView from "@/views/Riwayat/RiwayatBarangMasukView.vue";
import RiwayatBarangKeluarView from "@/views/Riwayat/RiwayatBarangKeluarView.vue";
import TambahStok from "@/components/Produk/TambahStok.vue";
import EditProduk from "@/components/Produk/EditProduk.vue";
import TokenPass from "@/components/Login/TokenPass.vue";

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
  {
    path: "/reset/:token",
    name: "reset",
    component: TokenPass,
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
        path: "/produk",
        name: "produk",
        component: BarangMasukView,
      },
      {
        path: "/produk/tambah-stok/:kodeProduk",
        name: "tambah-stok",
        component: TambahStok,
      },
      {
        path: "/produk/edit-produk/:kodeProduk",
        name: "edit-produk",
        component: EditProduk,
      },
      {
        path: "/produk/tambah-produk-baru",
        name: "tambah-produk-baru",
        component: TambahBarangMasukView,
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
        path: "/barang-keluar/detail/:idTransaksi",
        name: "DetailBrgKeluar",
        component: DetailBrgKeluar,
      },
      {
        path: "/barang-keluar/tambah-barang",
        name: "tambah-barang-keluar",
        component: TambahBrgKeluar,
      },
      {
        path: "/riwayat-barang-masuk",
        name: "riwayat-barang-masuk",
        component: RiwayatBarangMasukView,
      },
      {
        path: "/riwayat-barang-keluar",
        name: "riwayat-barang-keluar",
        component: RiwayatBarangKeluarView,
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
      await next({ name: "login" });
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
