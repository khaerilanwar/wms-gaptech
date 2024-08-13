<template>
  <div>
    <div class="flex mb-2 justify-between items-center">
      <div class="flex items-center">
        <p>Pencarian</p>
        <v-text-field
          v-model="search.namaPemesan"
          v-model:page="currentPage"
          class="ma-2"
          density="compact"
          placeholder="Cari Nama Pemesan"
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
        :worksheet="'Riwayat Transaksi ' + startDate + ' hingga ' + endDate"
        :name="'Riwayat Transaksi ' + startDate + ' hingga ' + endDate"
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
      class="border rounded-lg"
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
        <tr
          :class="getRowClass(index)"
          class="hover:bg-grey-primary hover:bg-opacity-15"
        >
          <td class="text-center">
            {{ getRowNumber(index, itemsPerPage, totalItems) }}
          </td>
          <td class="text-center">{{ item.idTransaksi }}</td>
          <td class="text-center">{{ item.namaPemesan }}</td>
          <td class="text-center">{{ $filters.currency(item.totalHarga) }}</td>

          <td class="text-center">
            {{ item.tanggalTransaksi.slice(0, 10) }}
          </td>
          <td class="text-center">
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
                <button>
                  <ComponentButton intent="detail"></ComponentButton>
                  <v-tooltip activator="parent" location="top">
                    Detail Transaksi
                  </v-tooltip>
                </button>
              </router-link>
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
import ComponentButton from "../ComponentButton.vue";
import { ArrowDownTrayIcon } from "@heroicons/vue/24/outline";
import JsonExcel from "vue-json-excel3";
import Notification from "../Notification.vue";

async function fetchData(startDate, endDate) {
  const response = await axiosInstance.get(
    `transactions/success/data-by-period?start=${startDate}&end=${endDate}`,
  );
  return response.data;
}

function formatDateTime(dateTimeString) {
  // Create a Date object with the UTC time provided
  const date = new Date(dateTimeString);

  // Extract the year, month, day, hours, and minutes
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Format the date as "dd-MM-yyyy hh:mm"
  return `${day}-${month}-${year} ${hours}:${minutes}`;
}

const API = {
  async fetch({ page, itemsPerPage, search, startDate, endDate, sortBy }) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        const items = (await fetchData(startDate, endDate)).filter((item) => {
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
  props: {
    startDate: {
      type: String,
      default: null,
    },
    endDate: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      ArrowDownTrayIcon: ArrowDownTrayIcon,
      itemsPerPage: 5,
      headers: [
        { title: "No", align: "start", sortable: false, width: "5%" },
        {
          title: "ID Transaksi",
          align: "center",
          sortable: false,
          key: "idTransaksi",
          width: "10%",
        },
        {
          title: "Nama Pemesan",
          align: "center",
          sortable: false,
          key: "namaPemesan",
          width: "30%",
        },
        {
          title: "Jumlah Transaksi",
          align: "center",
          sortable: false,
          key: "totalHarga",
          width: "20%",
        },
        {
          title: "Tanggal Transaksi",
          align: "center",
          key: "tanggalTransaksi",
          width: "10%",
        },
        {
          title: "Status",
          align: "center",
          key: "status",
          width: "20%",
          sortable: false,
        },
        { title: "Action", key: "action", align: "start", sortable: false },
      ],
      serverItems: [],
      loading: true,
      totalItems: 0,
      search: { namaPemesan: "" },
      json_data: [],
      json_fields: {
        "ID Transaksi": "idTransaksi",
        "Nama Pemesan": "namaPemesan",
        "Jumlah Transaksi": "totalHarga",
        "Tanggal Transaksi": "tanggalTransaksi",
      },
      currentPage: 1,
    };
  },
  watch: {
    startDate() {
      if (this.startDate === null) {
        return;
      }
      this.loadItems();
    },
    endDate() {
      if (this.endDate === null) {
        return;
      }
      this.loadItems();
    },
  },
  mounted() {
    this.loadItems();
  },
  methods: {
    async loadItems({ page, itemsPerPage, sortBy } = {}) {
      if (this.startDate === null || this.endDate === null) {
        return;
      }
      this.loading = true;
      this.currentPage = page || 1;
      const { items, total } = await API.fetch({
        page: this.currentPage,
        itemsPerPage: itemsPerPage || this.itemsPerPage,
        sortBy: sortBy || [],
        search: this.search,
        startDate: this.startDate,
        endDate: this.endDate,
      });
      items.forEach((item) => {
        item.tanggalTransaksi = formatDateTime(item.tanggalTransaksi);
      });
      this.serverItems = items;
      this.totalItems = total;
      this.loading = false;
    },
    searchItems() {
      this.loadItems({
        page: 1,
        itemsPerPage: this.itemsPerPage,
        search: this.search,
      });
    },
    getRowClass(index) {
      return index % 2 === 0 ? "bg-blue-bg" : "";
    },
    getRowNumber(index, itemsPerPage) {
      return (this.currentPage - 1) * itemsPerPage + index + 1;
    },
    changeColorStatus(status) {
      if (status == 0) return "orange";
      else return "green";
    },
    async fetchDataForExcel() {
      const { startDate, endDate } = this;
      const data = await fetchData(startDate, endDate);
      const filteredData = data.map(
        ({ idTransaksi, namaPemesan, totalHarga, tanggalTransaksi }) => ({
          idTransaksi: idTransaksi,
          namaPemesan: namaPemesan,
          totalHarga: totalHarga,
          tanggalTransaksi: formatDateTime(tanggalTransaksi),
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
