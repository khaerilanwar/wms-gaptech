<template>
  <div>
    <div>
      <div class="flex mb-2 justify-between items-center">
        <div class="flex items-center">
          <div class="flex items-center">
            <p>Pencarian</p>
            <v-text-field
              v-model="search.rak"
              class="pencarian ma-2"
              density="compact"
              placeholder="Cari Kode Rak"
              hide-details
              outlined
              filled
              @input="searchItems"
            ></v-text-field>
          </div>
          <div class="flex items-center gap-2">
            <p>Status</p>
            <v-select
              v-model="selectedStatus"
              class="status ma-2"
              :items="statusOptions"
              density="compact"
              outlined
              hide-details
              filled
              @change="searchItems"
            ></v-select>
          </div>
        </div>
        <div>
          <ComponentButton intent="primary" @click="clearFilters"
            >Hapus Filter</ComponentButton
          >
        </div>
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
      :search="search.rak"
      :items-per-page-options="[
        { value: 10, title: '10' },
        { value: 25, title: '25' },
        { value: 50, title: '50' },
        { value: 100, title: '100' },
      ]"
      item-value="rak"
      @update:options="loadItems"
    >
      <template #item="{ item, index }">
        <tr
          :class="getRowClass(index)"
          class="hover:bg-grey-primary hover:bg-opacity-15"
        >
          <td class="text-center">
            {{ getRowNumber(index, itemsPerPage) }}
          </td>
          <td class="text-center">{{ item.rak }}</td>
          <td class="text-center">{{ item.kapasitas }}</td>
          <td class="text-center">{{ item.terisi }}</td>
          <td>{{ item.produk }}</td>
          <td class="text-center">
            <v-chip
              :color="getStatusColor(getStatus(item.kapasitas, item.terisi))"
            >
              {{ getStatus(item.kapasitas, item.terisi) }}
            </v-chip>
          </td>
          <td>
            <div class="flex justify-center">
              <router-link :to="'/status-rack/edit/' + item.rak">
                <ComponentButton intent="edit"></ComponentButton>
                <v-tooltip activator="parent" location="top">
                  Edit Kapasitas
                </v-tooltip>
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
import ComponentButton from "../../components/ComponentButton.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
import axiosInstance from "@/utils/api";
import Notification from "../Notification.vue";

async function fetchData(selectedStatus) {
  let endpoint = "racks";

  if (selectedStatus !== null) {
    switch (selectedStatus) {
      case "Kosong":
        endpoint = "racks/empty";
        break;
      case "Penuh":
        endpoint = "racks/full";
        break;
      case "Hampir Penuh":
        endpoint = "racks/almost-full";
        break;
      case "Tersedia":
        endpoint = "racks/available";
        break;
      default:
        break;
    }
  }

  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

const API = {
  async fetch({ page, itemsPerPage, sortBy, search, status }) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        let items = (await fetchData(status)).filter((item) => {
          let match = true;
          if (
            search.rak &&
            item.rak &&
            !item.rak.toLowerCase().includes(search.rak.toLowerCase())
          ) {
            match = false;
          }
          return match;
        });

        if (sortBy.length) {
          const sortKey = sortBy[0].key;
          const sortOrder = sortBy[0].order;

          items.sort((a, b) => {
            if (sortKey === "terisi") {
              const aValue = a[sortKey];
              const bValue = b[sortKey];
              if (sortOrder === "asc") {
                return bValue - aValue;
              }
              return aValue - bValue;
            }
          });
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
  data() {
    return {
      PlusIcon: PlusIcon,
      itemsPerPage: 5,
      headers: [
        { title: "No", align: "start", sortable: false, width: "5%" },
        {
          title: "Rak",
          align: "center",
          key: "rak",
          width: "15%",
          sortable: false,
        },
        {
          title: "Kapasitas",
          align: "center",
          key: "kapasitas",
          width: "15%",
          sortable: false,
        },
        {
          title: "Terisi",
          align: "center",
          key: "terisi",
          width: "15%",
        },
        {
          title: "Produk",
          align: "center",
          key: "produk",
          width: "15%",
          sortable: false,
        },
        {
          title: "Status",
          align: "center",
          key: "status",
          width: "20%",
          sortable: false,
        },
        {
          title: "Edit",
          align: "center",
          key: "actions",
          width: "15%",
          sortable: false,
        },
      ],
      serverItems: [],
      loading: true,
      totalItems: 0,
      search: { rak: "" },
      currentPage: 1,
      selectedStatus: "",
    };
  },
  computed: {
    statusOptions() {
      return ["Kosong", "Penuh", "Hampir Penuh", "Tersedia"];
    },
  },
  watch: {
    selectedStatus() {
      this.loadItems();
    },
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
        status: this.selectedStatus,
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
    async clearFilters() {
      this.search.rak = "";
      this.selectedStatus = "";
      this.loadItems();
    },
    getRowClass(index) {
      return index % 2 === 0 ? "bg-blue-bg" : "";
    },
    getRowNumber(index, itemsPerPage) {
      return (this.currentPage - 1) * itemsPerPage + index + 1;
    },
    getStatus(kapasitas, terisi) {
      if (terisi === null || terisi === 0) {
        return "Kosong";
      }
      const percentage = (terisi / kapasitas) * 100;
      if (percentage >= 100) {
        return "Penuh";
      } else if (percentage >= 90) {
        return "Hampir Penuh";
      } else {
        return "Tersedia";
      }
    },
    getStatusColor(status) {
      switch (status) {
        case "Kosong":
          return "gray";
        case "Penuh":
          return "red";
        case "Hampir Penuh":
          return "orange";
        case "Tersedia":
          return "green";
        default:
          return "";
      }
    },
  },
};
</script>

<style scoped>
.pencarian {
  width: 200px;
}

.status {
  width: 200px;
}
</style>
