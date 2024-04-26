<template>
  <div>
    <div class="flex mb-2 justify-end items-center">
      <div class="flex items-center">
        <p>Pencarian</p>
        <v-text-field
          v-model="search.namaProduk"
          class="ma-2"
          density="compact"
          placeholder="Cari Produk"
          hide-details
          outlined
          filled
          @input="searchItems"
        ></v-text-field>
      </div>
    </div>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      class="border rounded-lg"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :search="search.namaProduk"
      :items-per-page-options="[
        { value: 10, title: '10' },
        { value: 25, title: '25' },
        { value: 50, title: '50' },
        { value: 100, title: '100' },
      ]"
      item-value="name"
      @update:options="loadItems"
    >
      <template #item="{ item, index }">
        <tr :class="getRowClass(index)">
          <td class="text-center bg-blue-300">{{ index + 1 }}</td>
          <td class="text-center bg-green-300">{{ item.kodeProduk }}</td>
          <td class="bg-pink-300">{{ item.namaProduk }}</td>
          <td class="text-center bg-yellow-300">
            {{ item.stokMasuk }}
          </td>
          <td class="text-center bg-gray-300">
            {{ item.dateInProduct }}
          </td>
        </tr>
      </template>
    </v-data-table-server>
  </div>
</template>

<script>
import axiosInstance from "@/utils/api";

async function fetchData() {
  const response = await axiosInstance.get("/inproducts/last30days");
  return response.data;
}

function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const localDateTime = new Date(
    dateTime.getTime() + dateTime.getTimezoneOffset() * 60000,
  );
  const day = localDateTime.getDate().toString().padStart(2, "0");
  const month = (localDateTime.getMonth() + 1).toString().padStart(2, "0");
  const year = localDateTime.getFullYear();
  const hours = localDateTime.getHours().toString().padStart(2, "0");
  const minutes = localDateTime.getMinutes().toString().padStart(2, "0");
  return `${day}-${month}-${year} ${hours}:${minutes}`;
}

const API = {
  async fetch({ page, itemsPerPage, search }) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        const items = (await fetchData()).filter((item) => {
          if (search && Object.keys(search).length > 0) {
            if (
              search.namaProduk &&
              !item.namaProduk
                .toLowerCase()
                .includes(search.namaProduk.toLowerCase())
            ) {
              return false;
            }
          }

          return true;
        });

        const paginated = items.slice(start, end);

        resolve({ items: paginated, total: items.length });
      }, 500);
    });
  },
};

export default {
  components: {},
  data() {
    return {
      itemsPerPage: 5,
      headers: [
        { title: "No", align: "start", sortable: false, width: "5%" },
        {
          title: "Kode Produk",
          align: "center",
          sortable: false,
          key: "kodeProduk",
          width: "10%",
        },
        {
          title: "Nama Produk",
          align: "center",
          sortable: false,
          key: "namaProduk",
          width: "40%",
        },
        {
          title: "Stok Masuk",
          align: "center",
          key: "stokMasuk",
          width: "10%",
          sortable: false,
        },
        {
          title: "Tanggal Masuk",
          align: "center",
          key: "dateInProduct",
          width: "20%",
          sortable: false,
        },
      ],
      serverItems: [],
      loading: true,
      totalItems: 0,
      search: { namaProduk: "" },
    };
  },
  watch: {
    name() {
      this.loadItems();
    },
  },
  methods: {
    async loadItems({ page, itemsPerPage, sortBy } = {}) {
      this.loading = true;
      const { items, total } = await API.fetch({
        page: page || 1,
        itemsPerPage: itemsPerPage || this.itemsPerPage,
        sortBy: sortBy || [],
        search: this.search,
      });
      items.forEach((item) => {
        item.dateInProduct = formatDateTime(item.dateInProduct);
      });
      this.serverItems = items;
      this.totalItems = total;
      this.loading = false;
    },
    searchItems() {
      this.loadItems({
        page: 1,
        itemsPerPage: this.itemsPerPage,
        sortBy: [],
        search: this.search,
      });
    },
    getRowClass(index) {
      return index % 2 === 0 ? "bg-blue-bg" : "";
    },
  },
};
</script>

<style scoped>
.v-text-field {
  width: 400px;
}
</style>
