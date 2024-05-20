<template>
  <div class="h-full">
    <div class="flex justify-center items-center font-semibold text-3xl mb-2">
      <h1 class="font-semibold">Daftar Transaksi</h1>
    </div>
    <TabelTransaksi
      class="p-10 border rounded-lg"
      @transaction-details="handleShowDetail"
    ></TabelTransaksi>
  </div>
</template>

<script>
import TabelTransaksi from "@/components/TabelTransaksi/TabelTransaksi.vue";

export default {
  components: {
    TabelTransaksi,
  },
  data() {
    return {};
  },
  methods: {
    handleShowDetail(idTransaksi) {
      this.$router.push({ name: "DetailBrgKeluar", params: { idTransaksi } });
    },
  },
};
</script>
