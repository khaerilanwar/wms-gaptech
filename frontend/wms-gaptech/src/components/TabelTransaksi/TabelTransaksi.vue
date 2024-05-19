<template>
  <v-card>
    <template #text>
      <v-text-field
        v-model="search.namaPemesan"
        label="Cari Nama Pemesan"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
        class="w-full"
        @input="searchItems"
      ></v-text-field>
    </template>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      v-model:page="currentPage"
      class="border rounded-lg p-3"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :search="search.namaPemesan"
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
            <v-chip class="ml-0 mr-8" :color="changeColorStatus(item.status)">
              <span v-if="item.status === 0">On Process</span>
            </v-chip>
          </td>
          <td class="flex">
            <div class="mt-3">
              <router-link :to="'/daftar-transaksi/edit/' + item.idTransaksi">
                <button>
                  <ComponentButton intent="edit"></ComponentButton>
                </button>
              </router-link>
              <router-link :to="'/daftar-transaksi/detail/' + item.idTransaksi">
                <button class="mx-1" @click="showDetails(item.idTransaksi)">
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
  </v-card>
  <Notification ref="notification" />
</template>

<script>
import axiosInstance from "@/utils/api";
import ComponentButton from "../ComponentButton.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
import Notification from "../Notification.vue";

async function fetchData() {
  const response = await axiosInstance.get("transactions/process");
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
              search.namaPemesan &&
              !item.namaPemesan
                .toLowerCase()
                .includes(search.namaPemesan.toLowerCase())
            ) {
              return false;
            }
          }

          return true;
        });

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
      {
        title: "ID Transaksi",
        key: "idTransaksi",
        align: "start",
        sortable: false,
      },
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
        sortable: false,
      },
      { title: "Action", key: "action", align: "start", sortable: false },
    ],
    serverItems: [],
    loading: true,
    totalItems: 0,
    currentPage: 1,
    search: { namaPemesan: "" },
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
