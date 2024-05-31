<template>
  <div>
    <div>
      <div class="flex mb-2 justify-between items-center">
        <div class="flex items-center">
          <p>Pencarian</p>
          <v-text-field
            v-model="search.produk"
            class="ma-2"
            density="compact"
            placeholder="Cari Kode Rak"
            hide-details
            outlined
            filled
            @input="searchItems"
          ></v-text-field>
        </div>
        <div class="flex items-center">
          <p>Filter Status:</p>
          <v-select
            v-model="selectedStatus"
            :items="statusOptions"
            dense
            outlined
            @change="searchItems"
          ></v-select>
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
      :search="search.produk"
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
                <button>
                  <ComponentButton intent="edit"></ComponentButton>
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
import ComponentButton from "../../components/ComponentButton.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
import axiosInstance from "@/utils/api";
import Notification from "../Notification.vue";
// import EditKapasitasDialog from "../../components/StatusRack/EditKapasitasDialog.vue";

async function fetchData() {
  const response = await axiosInstance.get("racks");
  console.log(response);
  return response.data;
}

const API = {
  async fetch({ page, itemsPerPage, sortBy, search, status }) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        let items = (await fetchData()).filter((item) => {
          let match = true;
          if (
            search.produk &&
            item.produk &&
            !item.produk.toLowerCase().includes(search.produk.toLowerCase())
          ) {
            match = false;
          }
          // if (status) {
          //     const itemStatus = getStatus(item.kapasitas, item.terisi);
          //     if (status !== itemStatus) {
          //         match = false;
          //     }
          // }
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
    // EditKapasitasDialog,
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
      search: { produk: "" },
      currentPage: 1,
      isEditDialogOpen: false,
      selectedItem: null,
      selectedStatus: "", // New property to store selected status filter
    };
  },
  computed: {
    statusOptions() {
      // Generate status filter options
      return ["Kosong", "Penuh", "Hampir Penuh", "Tersedia"];
    },
  },
  watch: {
    selectedStatus() {
      this.searchItems();
    },
  },
  methods: {
    async loadItems({ page, itemsPerPage, sortBy, status } = {}) {
      this.loading = true;
      this.currentPage = page || 1;
      const { items, total } = await API.fetch({
        page: this.currentPage,
        itemsPerPage: itemsPerPage || this.itemsPerPage,
        sortBy: sortBy || [],
        search: this.search,
        status: status || this.selectedStatus, // Pass selected status to API fetch function
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
        status: this.selectedStatus,
      });
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
      } else if (percentage >= 80) {
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
    async editKapasitas(item) {
      try {
        const response = await axiosInstance.get(`rack/${item.rak}`);
        const rackDetail = response.data;
        this.selectedItem = { ...item, ...rackDetail };
        this.isEditDialogOpen = true;
      } catch (error) {
        console.error("Error:", error);
        this.$refs.notification.showError("Gagal memuat detail rak");
      }
    },
    async saveKapasitas(updatedItem) {
      console.log("Updated Item:", updatedItem);
      try {
        const response = await axiosInstance.patch(`rack/${updatedItem.rak}`, {
          kapasitas: updatedItem.kapasitas,
        });
        console.log("API Response:", response);
        this.isEditDialogOpen = false; // Close the dialog after successful save
        await this.loadItems(); // Ensure the latest data is loaded after update
        this.$refs.notification.showSuccess("Berhasil mengubah kapasitas");
      } catch (error) {
        console.error("API Error:", error);
        this.$refs.notification.showError("Gagal mengubah kapasitas");
      }
    },
  },
  async filterByStatus(status) {
    try {
      let response;
      switch (status) {
        case "Kosong":
          response = await axiosInstance.get("racks/empty");
          break;
        case "Penuh":
          response = await axiosInstance.get("racks/full");
          break;
        case "Hampir Penuh":
          response = await axiosInstance.get("racks/almost-full");
          break;
        case "Tersedia":
          response = await axiosInstance.get("racks/available");
          break;
        default:
          response = await axiosInstance.get("racks");
      }
      this.serverItems = response.data;
    } catch (error) {
      console.error("Error filtering by status:", error);
    }
  },
};
</script>

<style scoped>
.v-text-field {
  width: 400px;
}
</style>
