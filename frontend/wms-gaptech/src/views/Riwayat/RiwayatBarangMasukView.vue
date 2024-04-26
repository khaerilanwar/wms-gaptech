<template>
  <div class="h-full">
    <div class="flex justify-center items-center font-semibold text-3xl mb-3">
      <h1 class="font-semibold">Riwayat Barang Masuk</h1>
    </div>
    <TabelRiwayatBarangMasuk></TabelRiwayatBarangMasuk>
  </div>
</template>

<script>
import TabelRiwayatBarangMasuk from "@/components/BarangMasuk/TabelRiwayatBarangMasuk.vue";
export default {
  components: {
    TabelRiwayatBarangMasuk,
  },
};
</script>

<style lang="scss" scoped></style>
