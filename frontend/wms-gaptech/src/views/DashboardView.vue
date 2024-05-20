<template>
  <div>
    <div class="flex space-x-2">
      <div class="w-3/4 flex flex-col">
        <h1 class="font-semibold xl:text-2xl mb-2">
          Ringkasan Barang Masuk dan Keluar
        </h1>
        <div class="flex-grow"><Diagram></Diagram></div>
      </div>
      <div class="w-1/2 flex flex-col">
        <PemasukanPemesanan class="flex-grow"></PemasukanPemesanan>
      </div>
    </div>
    <div class="w-full"><RingkasanBarang></RingkasanBarang></div>
  </div>
</template>

<script setup>
import RingkasanBarang from "@/components/Dashboard/RingkasanBarang.vue";
import PemasukanPemesanan from "@/components/Dashboard/PemasukanPemesanan.vue";
import Diagram from "@/components/Dashboard/Diagram.vue";
</script>
