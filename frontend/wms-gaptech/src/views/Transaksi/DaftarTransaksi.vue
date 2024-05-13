<template>
  <div class="bg-white p-4 h-full border rounded border-black">
    <p
      class="flex justify-center font-mono items-center font-semibold text-3xl mt-15 mb-10"
    >
      Daftar Transaksi
    </p>

    <TabelTransaksi
      class="p-10 border rounded-lg"
      @transaction-details="handleShowDetail"
    ></TabelTransaksi>
  </div>
</template>

<script>
import TabelTransaksi from "@/components/TabelTransaksi.vue";

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
