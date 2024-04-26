<template>
  <div class="h-full">
    <div class="flex justify-center items-center font-semibold text-3xl mb-2">
      <h1 class="font-semibold">Daftar Produk</h1>
    </div>
    <TabelProduk></TabelProduk>
  </div>
</template>

<script>
import TabelProduk from "@/components/BarangMasuk/TabelProduk.vue";
export default {
  components: {
    TabelProduk,
  },
};
</script>

<style lang="scss" scoped></style>
