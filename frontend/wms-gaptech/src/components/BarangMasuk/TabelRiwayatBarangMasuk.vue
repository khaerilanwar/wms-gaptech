<template>
  <div class="flex justify-between">
    <div class="space-y-2">
      <p>Filter</p>
      <v-chip variant="outlined"> 30 hari terakhir</v-chip>
    </div>

    <div class="space-y-2">
      <p>Pilih periode tanggal manual</p>
      <div class="flex items-center">
        <div class="relative">
          <input
            v-model="startDate"
            name="start"
            type="date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-primary focus:border-blue-primary block w-full py-2.5 p-2"
            placeholder="Pilih tanggal mulai"
          />
        </div>
        <span class="mx-4 text-gray-500">hingga</span>
        <div class="relative mr-5">
          <input
            v-model="endDate"
            name="start"
            type="date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-primary focus:border-blue-primary block w-full py-2.5 p-2"
            placeholder="Pilih tanggal mulai"
          />
        </div>
        <ComponentButton intent="primary" @click="handleGetData"
          >Ambil Data
        </ComponentButton>
      </div>
    </div>
  </div>

  <div v-show="!showTable" class="flex items-center justify-center mt-10">
    <img src="../../../public/show data.png" alt="" srcset="" class="w-36" />
    <span class="text-xl font-semibold">Pilih Filter Terlebih Dahulu!</span>
  </div>

  <!-- tabel -->
  <div v-show="showTable">
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
  <Notification ref="notification" />
</template>

<script>
import Notification from "../Notification.vue";
import ComponentButton from "../ComponentButton.vue";
import axiosInstance from "@/utils/api";

async function fetchData(startDate, endDate) {
  const response = await axiosInstance.get(
    `inproducts/data-by-period?start=${startDate}&end=${endDate}`,
  );
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
  async fetch({ page, itemsPerPage, search, startDate, endDate }) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        const items = (await fetchData(startDate, endDate)).filter((item) => {
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
  components: { Notification, ComponentButton },
  data() {
    return {
      startDate: null,
      endDate: null,
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
      showTable: false,
    };
  },
  watch: {
    name() {
      this.loadItems();
    },
  },
  methods: {
    handleGetData() {
      const today = new Date();
      const currentDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );

      if (this.startDate && this.endDate) {
        const startDateObj = new Date(this.startDate);
        const endDateObj = new Date(this.endDate);

        const startDateWithoutTime = new Date(
          startDateObj.getFullYear(),
          startDateObj.getMonth(),
          startDateObj.getDate(),
        );
        const endDateWithoutTime = new Date(
          endDateObj.getFullYear(),
          endDateObj.getMonth(),
          endDateObj.getDate(),
        );

        if (
          startDateWithoutTime > currentDate ||
          endDateWithoutTime > currentDate
        ) {
          this.$refs.notification.showError(
            "Tanggal tidak boleh melebihi hari ini",
          );
          return;
        }
        if (new Date(this.startDate) > new Date(this.endDate)) {
          this.$refs.notification.showError(
            "Tanggal mulai harus lebih kecil dari tanggal akhir",
          );
          return;
        }
        this.showTable = true;
      } else {
        this.$refs.notification.showError(
          "Isi tanggal mulai dan tanggal akhir terlebih dahulu",
        );
      }
      this.loadItems();
    },
    async loadItems({ page, itemsPerPage, sortBy } = {}) {
      this.loading = true;
      const { items, total } = await API.fetch({
        page: page || 1,
        itemsPerPage: itemsPerPage || this.itemsPerPage,
        sortBy: sortBy || [],
        search: this.search,
        startDate: this.startDate,
        endDate: this.endDate,
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
