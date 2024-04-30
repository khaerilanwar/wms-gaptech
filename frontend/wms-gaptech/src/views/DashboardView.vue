<template>
  <div>
    <div class="mb-2 flex justify-between space-x-2">
      <div class="w-3/5"><Diagram></Diagram></div>
      <div class="w-2/5"><PemasukanPemesanan></PemasukanPemesanan></div>
    </div>
    <div class="w-full"><RingkasanBarang></RingkasanBarang></div>
  </div>
</template>

<script setup>
import RingkasanBarang from "@/components/Dashboard/RingkasanBarang.vue";
import PemasukanPemesanan from "@/components/Dashboard/PemasukanPemesanan.vue";
import Diagram from "@/components/Dashboard/Diagram.vue";
</script>
