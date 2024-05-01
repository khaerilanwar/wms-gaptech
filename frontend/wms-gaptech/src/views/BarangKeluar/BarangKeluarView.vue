<template>
  <div class="bg-white p-4 h-full border rounded border-black">
    <p
      class="flex justify-center font-mono items-center font-semibold text-3xl mt-10"
    >
      BARANG KELUAR
    </p>
    <div class="flex items-center place-content-end mt-12">
      <router-link to="/barang-keluar/tambah-barang">
        <ComponentButton intent="primary" :left-icon="PlusIcon">
          Tambah Data
        </ComponentButton>
      </router-link>
    </div>

    <TabelBarangKeluar
      class="p-4 mt-3 border rounded-lg"
      @transaction-details="handleShowDetail"
    ></TabelBarangKeluar>
  </div>
</template>

<script>
import ComponentButton from "@/components/ComponentButton.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
import TabelBarangKeluar from "@/components/TabelBarangKeluar.vue";

export default {
  components: {
    ComponentButton,
    TabelBarangKeluar,
  },
  data() {
    return {
      PlusIcon: PlusIcon,
    };
  },
  methods: {
    handleShowDetail(idTransaksi) {
      this.$router.push({ name: "DetailBrgKeluar", params: { idTransaksi } });
    },
  },
};
</script>
