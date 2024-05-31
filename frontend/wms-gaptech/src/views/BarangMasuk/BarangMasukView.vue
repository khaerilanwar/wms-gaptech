<template>
  <div class="h-full">
    <div class="flex justify-center items-center font-semibold text-3xl mb-2">
      <h1 class="font-semibold">Daftar Produk</h1>
    </div>
    <test></test>
    <TabelProduk></TabelProduk>
  </div>
</template>

<script>
import TabelProduk from "@/components/TabelBarangMasuk/TabelProduk.vue";
import test from "@/components/TabelBarangMasuk/test.vue";
export default {
  components: {
    TabelProduk,
    test,
  },
};
</script>

<style lang="scss" scoped></style>
