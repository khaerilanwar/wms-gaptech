<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    item-value="name"
    @update:options="loadItems"
  >
    <template #item="{ item, index }">
      <tr :class="diffRowColor(index)">
        <td>{{ index + 1 }}</td>
        <td>{{ item.idTransaksi }}</td>
        <td>{{ item.tanggalTransaksi.slice(0, 10) }}</td>
        <td class="flex">
          <div class="mt-3">
            <router-link :to="'/barang-keluar/detail/' + item.idTransaksi">
              <button @click="showDetails(item.idTransaksi)">
                <ComponentButton intent="edit"></ComponentButton>
              </button>
            </router-link>
            <button @click="deleteTransaction(item.idTransaksi)">
              <ComponentButton intent="delete"></ComponentButton>
            </button>
          </div>
        </td>
      </tr>
    </template>
  </v-data-table-server>
  <Notification ref="notification" />
</template>

<script>
import axiosInstance from "@/utils/api";
import ComponentButton from "./ComponentButton.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
import Notification from "./Notification.vue";

async function fetchData() {
  const response = await axiosInstance.get("transactions");
  return response.data;
}

const API = {
  async fetch({ page, itemsPerPage, sortBy }) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        const items = await fetchData();

        if (sortBy.length) {
          const sortKey = sortBy[0].key;
          const sortOrder = sortBy[0].order;
          if (sortKey === "tanggalTransaksi") {
            items.sort((a, b) => {
              const dateA = new Date(a[sortKey]);
              const dateB = new Date(b[sortKey]);
              return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
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
    Notification,
  },
  emits: ["transaction-details"],
  data: () => ({
    PlusIcon: PlusIcon,
    itemsPerPage: 5,
    headers: [
      {
        title: "No",
        align: "start",
      },
      { title: "ID Transaksi", key: "id", align: "start", sortable: false },
      {
        title: "Tanggal Keluar",
        key: "tanggalTransaksi",
        align: "start",
      },
      { title: "Action", key: "action", align: "start", sortable: false },
    ],
    serverItems: [],
    loading: true,
    totalItems: 0,
  }),
  created() {
    this.loadItems();
  },
  methods: {
    async loadItems({ page, itemsPerPage, sortBy } = {}) {
      this.loading = true;
      const { items, total } = await API.fetch({
        page: page || 1,
        itemsPerPage: itemsPerPage || this.itemsPerPage,
        sortBy: sortBy || [],
      });
      this.serverItems = items;
      this.totalItems = total;
      this.loading = false;
    },

    async showDetails(dataItem) {
      this.$emit("transaction-details", dataItem);
    },

    async deleteTransaction(idTransaksi) {
      const isConfirmed = window.confirm(
        "Apakah Anda yakin untuk menghapus data?",
      );
      if (isConfirmed) {
        await axiosInstance.delete(`transaction/${idTransaksi}`);
        this.loadItems();
        this.$refs.notification.showSuccess("Transaksi berhasil dihapus");
      }
    },

    diffRowColor(index) {
      return (index + 1) % 2 !== 0 ? "bg-slate-100" : "";
    },
  },
};
</script>
