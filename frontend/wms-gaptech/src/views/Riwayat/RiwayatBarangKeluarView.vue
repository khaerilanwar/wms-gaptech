<template>
  <div class="h-full">
    <div class="flex justify-center items-center font-semibold text-3xl mb-3">
      <h1 class="font-semibold">Riwayat Barang Keluar</h1>
    </div>
    <TabelRiwayatBarangKeluar></TabelRiwayatBarangKeluar>
  </div>
</template>

<script>
import TabelRiwayatBarangKeluar from "@/components/TabelBarangKeluar/TabelRiwayatBarangKeluar.vue";

export default {
  components: {
    TabelRiwayatBarangKeluar,
  },
};
</script>

<style lang="scss" scoped></style>
