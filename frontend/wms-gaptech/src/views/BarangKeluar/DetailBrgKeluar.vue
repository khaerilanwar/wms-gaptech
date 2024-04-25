<template>
  <div class="bg-white p-4 h-full border rounded border-black">
    <div class="flex justify-end m-2">
      <router-link to="/barang-keluar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
            clip-rule="evenodd"
          />
        </svg>
      </router-link>
    </div>
    <p
      class="flex justify-center font-mono items-center font-semibold text-3xl mt-10"
    >
      DETAIL BARANG
    </p>

    <div class="flex flex-col mt-14 mb-10 ml-15 gap-3">
      <div class="flex flex-row">
        <p class="font-medium">ID Transaksi :</p>
        <p class="ml-2">ID/20230714/TK0001</p>
      </div>
      <div class="flex flex-row">
        <p class="font-medium">Nama Pemesan :</p>
        <p class="ml-2">Jhon Thor</p>
      </div>
      <div class="flex flex-row">
        <p class="font-medium">Alamat Pengiriman :</p>
        <p class="ml-2">Jln. in aja dulu</p>
      </div>
    </div>

    <v-table class="px-12">
      <thead>
        <tr class="border">
          <th class="text-left">No</th>
          <th class="text-left">ID Barang</th>
          <th class="text-left">Nama Barang</th>
          <th class="text-left">Jumlah Pesanan</th>
          <th class="text-left">Total Harga</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.name" class="border">
          <td>{{ item.number }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.totalPrice }}</td>
        </tr>
      </tbody>
    </v-table>

    <div class="flex justify-center items-center mt-14">
      <ComponentButton intent="primary" :left-icon="PlusIcon">
        Cetak
      </ComponentButton>
    </div>
  </div>
</template>

<script>
import ComponentButton from "@/components/ComponentButton.vue";

export default {
  components: {
    ComponentButton,
  },
  data() {
    return {
      desserts: [
        {
          number: 1,
          id: "TK-001",
          name: "Stylabags Crossbody Bag",
          qty: 20,
          totalPrice: 20000000,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
