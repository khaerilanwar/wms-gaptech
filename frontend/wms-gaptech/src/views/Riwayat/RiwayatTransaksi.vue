<template>
  <div class="h-full">
    <div class="flex justify-center items-center font-semibold text-3xl mb-3">
      <h1 class="font-semibold">Riwayat Transaksi</h1>
    </div>
    <TabelRiwayatTransaksi></TabelRiwayatTransaksi>
  </div>
</template>

<script>
import TabelRiwayatTransaksi from "@/components/TabelRiwayatTransaksi/TabelRiwayatTransaksi.vue";

export default {
  components: {
    TabelRiwayatTransaksi,
  },
};
</script>

<style lang="scss" scoped></style>
