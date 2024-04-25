<template>
  <div>
    <div class="flex mb-2 justify-between items-center">
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
      <div>
        <router-link to="/barang-masuk/tambah-barang">
          <ComponentButton intent="primary" :left-icon="PlusIcon">
            Tambah Data
          </ComponentButton>
        </router-link>
      </div>
    </div>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      class="border rounded-lg"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :search="search"
      item-value="name"
      @update:options="loadItems"
    >
      <template #item="{ item, index }">
        <tr :class="getRowClass(index)">
          <td class="text-center">{{ index + 1 }}</td>
          <td class="text-center">{{ item.kodeProduk }}</td>
          <td>{{ item.namaProduk }}</td>
          <td class="text-center">{{ item.posisiRak }}</td>
          <td>
            <v-chip :color="getColor(item.stok)">
              {{ item.stok }}
            </v-chip>
          </td>
          <td class="flex">
            <button @click="addProduct(item)">
              <ComponentButton intent="add"></ComponentButton>
            </button>
            <button @click="addProduct(item)">
              <ComponentButton intent="edit"></ComponentButton>
            </button>
            <button @click="deleteItem(item)">
              <ComponentButton intent="delete"></ComponentButton>
            </button>
          </td>
        </tr>
      </template>
    </v-data-table-server>
  </div>
</template>

<script>
import ComponentButton from "../../components/ComponentButton.vue";
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

          return true;
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
  components: {
    ComponentButton,
  },
  data() {
    return {
      PlusIcon: PlusIcon,
      itemsPerPage: 5,
      headers: [
        { title: "No", align: "start", sortable: false, width: "5%" },
        {
          title: "Kode Produk",
          align: "center",
          sortable: false,
          key: "kodeProduk",
          width: "15%",
        },
        {
          title: "Nama Produk",
          align: "center",
          sortable: false,
          key: "namaProduk",
          width: "40%",
        },
        {
          title: "Posisi Rak",
          align: "center",
          key: "posisiRak",
          width: "15%",
          sortable: false,
        },
        { title: "Stok", align: "center", key: "stok", width: "15%" },
        { title: "Edit", align: "center", sortable: false, key: "actions" },
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
