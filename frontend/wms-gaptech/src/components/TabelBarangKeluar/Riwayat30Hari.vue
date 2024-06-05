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
      <download-excel
        :data="json_data"
        :fields="json_fields"
        :stringify-long-num="true"
        worksheet="Riwayat Barang Keluar 30 Hari Terakhir"
        name="Riwayat Barang Keluar 30 Hari Terakhir.xls"
      >
        <ComponentButton
          intent="primary"
          :right-icon="ArrowDownTrayIcon"
          @click="fetchDataForExcel"
        >
          Unduh File
        </ComponentButton>
      </download-excel>
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
          <td class="text-center">
            {{ item.stokKeluar }}
          </td>
          <td class="text-center">
            {{ item.dateOutProduct }}
          </td>
        </tr>
      </template>
    </v-data-table-server>
    <Notification ref="notification" />
  </div>
</template>

<script>
import axiosInstance from "@/utils/api";
import JsonExcel from "vue-json-excel3";
import ComponentButton from "../ComponentButton.vue";
import { ArrowDownTrayIcon } from "@heroicons/vue/24/outline";
import Notification from "../Notification.vue";

async function fetchData() {
  const response = await axiosInstance.get("/outproducts/last30days");
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
  async fetch({ page, itemsPerPage, search, sortBy }) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        let items = await fetchData();

        if (search && Object.keys(search).length > 0) {
          items = items.filter((item) => {
            if (
              search.namaProduk &&
              !item.namaProduk
                .toLowerCase()
                .includes(search.namaProduk.toLowerCase())
            ) {
              return false;
            }
            return true;
          });
        }

        if (sortBy.length) {
          const sortKey = sortBy[0].key;
          const sortOrder = sortBy[0].order;
          if (sortKey === "dateOutProduct") {
            items.sort((a, b) => {
              const dateA = new Date(a[sortKey]).getTime();
              const dateB = new Date(b[sortKey]).getTime();
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
  components: { downloadExcel: JsonExcel, ComponentButton, Notification },
  data() {
    return {
      ArrowDownTrayIcon: ArrowDownTrayIcon,
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
          title: "Stok Keluar",
          align: "center",
          key: "stokKeluar",
          width: "10%",
          sortable: false,
        },
        {
          title: "Tanggal Keluar",
          align: "center",
          key: "dateOutProduct",
          width: "20%",
        },
      ],
      serverItems: [],
      loading: true,
      totalItems: 0,
      search: { namaProduk: "" },
      json_data: [],
      json_fields: {
        "Kode Produk": "kodeProduk",
        "Nama Produk": "namaProduk",
        "Stok Keluar": "stokKeluar",
        "Tanggal keluar": "dateOutProduct",
      },
      currentPage: 1,
    };
  },
  mounted() {
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

      items.forEach((item) => {
        item.dateOutProduct = formatDateTime(item.dateOutProduct);
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
    async fetchDataForExcel() {
      const data = await fetchData();
      const filteredData = data.map(
        ({ kodeProduk, namaProduk, stokKeluar, dateOutProduct }) => ({
          kodeProduk: kodeProduk,
          namaProduk: namaProduk,
          stokKeluar: stokKeluar,
          dateOutProduct: formatDateTime(dateOutProduct),
        }),
      );

      this.json_data = filteredData;
      this.$refs.notification.showSuccess(
        "Berhasil mengambil data untuk di unduh",
      );
    },
  },
};
</script>

<style scoped>
.v-text-field {
  width: 400px;
}
</style>
