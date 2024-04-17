<template>
  <div class="h-full">
    <div class="flex justify-center items-center font-semibold text-3xl mb-2">
      <h1 class="font-semibold">Barang Masuk</h1>
    </div>
    <TabelBarangMasuk></TabelBarangMasuk>
  </div>
</template>

<script>
import TabelBarangMasuk from "@/components/TabelBarangMasuk.vue";
export default {
  components: {
    TabelBarangMasuk,
  },
};
</script>

<style lang="scss" scoped></style>
