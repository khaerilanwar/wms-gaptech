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
import EditKapasitasDialog from "../../components/StatusRack/EditKapasitasDialog.vue";

async function fetchData() {
  const response = await axiosInstance.get("racks");
  return response.data;
}

const API = {
  async fetch({ page, itemsPerPage, sortBy, search }) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        let items = (await fetchData()).filter((item) => {
          if (search && Object.keys(search).length > 0) {
            if (
              search.namaProduk &&
              !item.produk
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

          items.sort((a, b) => {
            if (sortKey === "status") {
              const statusA = getStatus(a.kapasitas, a.terisi);
              const statusB = getStatus(b.kapasitas, b.terisi);
              if (sortOrder === "desc") {
                return statusB.localeCompare(statusA);
              }
              return statusA.localeCompare(statusB);
            } else {
              const aValue = a[sortKey];
              const bValue = b[sortKey];
              if (sortOrder === "desc") {
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
    EditKapasitasDialog,
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
          sortable: true,
          key: "rak",
          width: "15%",
        },
        {
          title: "Kapasitas",
          align: "center",
          sortable: true,
          key: "kapasitas",
          width: "15%",
        },
        {
          title: "Terisi",
          align: "center",
          sortable: true,
          key: "terisi",
          width: "15%",
        },
        {
          title: "Produk",
          align: "center",
          sortable: true,
          key: "produk",
          width: "15%",
        },
        {
          title: "Status",
          align: "center",
          sortable: true,
          key: "status",
          width: "20%",
        },
        {
          title: "Edit",
          align: "center",
          sortable: false,
          key: "actions",
          width: "15%",
        },
      ],
      serverItems: [],
      loading: true,
      totalItems: 0,
      search: { namaProduk: "" },
      currentPage: 1,
      isEditDialogOpen: false,
      selectedItem: null,
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
};
</script>
