<template>
  <div class="h-full">
    <div class="flex justify-center items-center font-semibold text-3xl mb-2">
      <h1 class="font-semibold">Status Rak</h1>
    </div>
    <TableStatusRack></TableStatusRack>
  </div>
</template>

<script>
import TableStatusRack from "@/components/StatusRack/TableStatusRack.vue";
export default {
  components: {
    TableStatusRack,
  },
};
</script>

<style lang="scss" scoped></style>
