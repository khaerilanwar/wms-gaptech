<template>
  <div class="h-full">
    <router-link to="/produk" class="flex items-center hover:text-blue-primary">
      <ChevronLeftIcon class="h-6 w-6" />
      <span class="text-sm">Kembali</span>
    </router-link>
    <div class="flex justify-center items-center font-semibold text-3xl mb-2">
      <h1 class="font-semibold">Detail Produk Baru</h1>
    </div>
    <FormProdukBaru />
  </div>
</template>

<script>
import FormProdukBaru from "@/components/ProdukBaru/FormProdukBaru.vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
export default {
  components: {
    FormProdukBaru,
    ChevronLeftIcon,
  },
};
</script>

<style lang="scss" scoped></style>
