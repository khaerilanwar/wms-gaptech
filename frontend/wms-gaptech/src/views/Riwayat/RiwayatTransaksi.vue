<template>
  <div class="bg-white p-4 h-full border rounded border-black">
    <p
      class="flex justify-center font-mono items-center font-semibold text-3xl mt-15 mb-10"
    >
      Riwayat Transaksi
    </p>

    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      v-model:page="currentPage"
      class="border rounded-lg"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
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
        <tr :class="diffRowColor(index)" class="">
          <td>
            {{ getRowNumber(index, itemsPerPage, totalItems) }}
          </td>
          <td>{{ item.idTransaksi }}</td>
          <td>{{ item.namaPemesan }}</td>
          <td>{{ item.tanggalTransaksi.slice(0, 10) }}</td>
          <td>
            <v-chip :color="changeColorStatus(item.status)">
              <span v-if="item.status === 0">On Process</span>
              <span v-else>Succes</span>
            </v-chip>
          </td>
          <td class="flex">
            <div class="mt-3">
              <router-link
                :to="'/riwayat-transaksi/detail/' + item.idTransaksi"
              >
                <button @click="showDetails(item.idTransaksi)">
                  <ComponentButton intent="detail"></ComponentButton>
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
  </div>
</template>

<script>
import axiosInstance from "@/utils/api";
import ComponentButton from "@/components/ComponentButton.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
import Notification from "@/components/Notification.vue";

async function fetchData() {
  const response = await axiosInstance.get("transactions/success");
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
        title: "Nama Pemesan",
        key: "namaPemesan",
        align: "start",
        sortable: false,
      },
      {
        title: "Tanggal Transaksi",
        key: "tanggalTransaksi",
        align: "start",
      },
      {
        title: "Status",
        key: "status",
        align: "start",
      },
      { title: "Action", key: "action", align: "start", sortable: false },
    ],
    serverItems: [],
    loading: true,
    totalItems: 0,
    currentPage: 1,
  }),
  created() {
    this.loadItems();
  },
  methods: {
    async loadItems({ page, itemsPerPage, sortBy } = {}) {
      this.loading = true;
      this.currentPage = page || 1;
      const { items, total } = await API.fetch({
        page: this.currentPage,
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

    getRowNumber(index, itemsPerPage) {
      return (this.currentPage - 1) * itemsPerPage + index + 1;
    },

    changeColorStatus(status) {
      if (status == 0) return "orange";
      else return "green";
    },
  },
};
</script>
