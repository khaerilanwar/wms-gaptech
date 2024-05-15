<template>
  <div class="mt-5">
    <h1 class="font-semibold xl:text-2xl">Ringkasan Stok Barang</h1>
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
      v-model:page="currentPage"
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
        <tr
          :class="getRowClass(index)"
          class="hover:bg-grey-primary hover:bg-opacity-15"
        >
          <td class="text-center">
            {{ getRowNumber(index, itemsPerPage, totalItems) }}
          </td>
          <td class="text-center">{{ item.kodeProduk }}</td>
          <td>{{ item.namaProduk }}</td>
          <td>
            <v-chip :color="getColor(item.stok)">
              {{ item.stok }}
            </v-chip>
          </td>
        </tr>
      </template>
    </v-data-table-server>
  </div>
</template>

<script>
import { PlusIcon } from "@heroicons/vue/24/outline";
import axiosInstance from "@/utils/api";

async function fetchData() {
  const response = await axiosInstance.get("products");
  return response.data;
}

const API = {
  async fetch({ page, itemsPerPage, sortBy, search }) {
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
          if (item.stok < 50 || item.stok < 100) {
            return true;
          }
          return false;
        });
        if (sortBy.length) {
          const sortKey = sortBy[0].key;
          const sortOrder = sortBy[0].order;
          if (sortKey === "stok") {
            items.sort((a, b) => {
              const aValue = a[sortKey];
              const bValue = b[sortKey];
              return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
            });
          }
        }
        const paginated = items.slice(start, end);
        resolve({ items: paginated, total: items.length });
      }, 500);
    });
  },
};

export default {
  data() {
    return {
      PlusIcon: PlusIcon,
      itemsPerPage: 5,
      headers: [
        { title: "No", align: "center", sortable: false },
        {
          title: "Kode Produk",
          align: "center",
          sortable: false,
          key: "kodeProduk",
        },
        {
          title: "Nama Produk",
          align: "center",
          sortable: false,
          key: "namaProduk",
        },
        { title: "Stok", align: "center", key: "stok" },
      ],
      serverItems: [],
      loading: true,
      totalItems: 0,
      search: { namaProduk: "" },
      currentPage: 1,
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
      this.currentPage = page || 1;
      const defaultSortOrder = "asc";
      const { items, total } = await API.fetch({
        page: this.currentPage,
        itemsPerPage: itemsPerPage || this.itemsPerPage,
        sortBy: sortBy.length
          ? sortBy
          : [{ key: "stok", order: defaultSortOrder }],
        search: this.search,
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
    getRowNumber(index, itemsPerPage) {
      return (this.currentPage - 1) * itemsPerPage + index + 1;
    },
    getColor(stock) {
      if (stock > 100) return "green";
      else if (stock > 50) return "orange";
      else return "red";
    },
  },
};
</script>

<style scoped>
.v-text-field {
  width: 400px;
}
</style>
