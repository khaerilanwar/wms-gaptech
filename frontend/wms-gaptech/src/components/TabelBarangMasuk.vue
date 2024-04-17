<template>
  <div>
    <div class="flex mb-2 justify-between items-center">
      <div class="flex items-center">
        <p>Search</p>
        <v-text-field
          v-model="search.nama"
          class="ma-2"
          density="compact"
          placeholder="Search name..."
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
          <td>{{ index + 1 }}</td>
          <td>{{ item.kodeProduk }}</td>
          <td>{{ item.nama }}</td>
          <td>{{ item.tanggalMasuk }}</td>
          <td>
            <v-chip :color="getColor(item.stock)">
              {{ item.stock }}
            </v-chip>
          </td>
          <td>{{ item.posisiRak }}</td>
          <td class="flex">
            <button @click="addProduct(item)">
              <ComponentButton intent="add"></ComponentButton>
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
import ComponentButton from "./ComponentButton.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
const barangMasuk = [
  {
    kodeProduk: "bg-0001",
    nama: "Kertas Putih",
    tanggalMasuk: "2023-04-07",
    stock: 51,
    posisiRak: "A2",
  },
  {
    kodeProduk: "bg-0002",
    nama: "Kertas Warna",
    tanggalMasuk: "2023-04-02",
    stock: 114,
    posisiRak: "B3",
  },
  {
    kodeProduk: "bg-0003",
    nama: "Kertas HVS",
    tanggalMasuk: "2023-04-11",
    stock: 30,
    posisiRak: "C1",
  },
  {
    kodeProduk: "bg-0004",
    nama: "Kertas Karton",
    tanggalMasuk: "2023-04-12",
    stock: 18,
    posisiRak: "A3",
  },
  {
    kodeProduk: "bg-0005",
    nama: "Kertas Laminasi",
    tanggalMasuk: "2023-04-08",
    stock: 22,
    posisiRak: "B1",
  },
  {
    kodeProduk: "bg-0006",
    nama: "Kertas Foto",
    tanggalMasuk: "2023-04-06",
    stock: 10,
    posisiRak: "C3",
  },
  {
    kodeProduk: "bg-0007",
    nama: "Kertas Sampul",
    tanggalMasuk: "2023-04-10",
    stock: 28,
    posisiRak: "A1",
  },
  {
    kodeProduk: "bg-0008",
    nama: "Kertas Emboss",
    tanggalMasuk: "2023-04-05",
    stock: 17,
    posisiRak: "B2",
  },
  {
    kodeProduk: "bg-0009",
    nama: "Kertas Kado",
    tanggalMasuk: "2023-04-13",
    stock: 25,
    posisiRak: "C2",
  },
  {
    kodeProduk: "bg-0010",
    nama: "Kertas Stiker",
    tanggalMasuk: "2023-04-09",
    stock: 20,
    posisiRak: "A2",
  },
  {
    kodeProduk: "bg-0011",
    nama: "Kertas Karbon",
    tanggalMasuk: "2023-04-15",
    stock: 14,
    posisiRak: "B3",
  },
  {
    kodeProduk: "bg-0012",
    nama: "Kertas Kalkir",
    tanggalMasuk: "2023-04-04",
    stock: 16,
    posisiRak: "C1",
  },
  {
    kodeProduk: "bg-0013",
    nama: "Kertas Origami",
    tanggalMasuk: "2023-04-01",
    stock: 32,
    posisiRak: "A3",
  },
  {
    kodeProduk: "bg-0014",
    nama: "Kertas Duplex",
    tanggalMasuk: "2023-04-14",
    stock: 19,
    posisiRak: "B1",
  },
  {
    kodeProduk: "bg-0015",
    nama: "Kertas Jadi",
    tanggalMasuk: "2023-04-03",
    stock: 21,
    posisiRak: "C2",
  },
];

const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy, search }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        let items = [...barangMasuk];
        if (search && Object.keys(search).length > 0) {
          items = items.filter((item) => {
            if (
              search.nama &&
              !item.nama.toLowerCase().includes(search.nama.toLowerCase())
            ) {
              return false;
            }
            return true;
          });
        }
        if (sortBy.length) {
          const sortKey = sortBy[0].key;
          const sortOrder = sortBy[0].order;
          if (sortKey === "tanggalMasuk") {
            items.sort((a, b) => {
              const dateA = new Date(a[sortKey]).getTime();
              const dateB = new Date(b[sortKey]).getTime();
              return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
            });
          } else if (sortKey === "posisiRak") {
            items.sort((a, b) => {
              const [charA, numA] = a[sortKey].split(/(\d+)/);
              const [charB, numB] = b[sortKey].split(/(\d+)/);
              if (charA === charB) {
                return sortOrder === "desc" ? numB - numA : numA - numB;
              } else {
                return sortOrder === "desc"
                  ? charB.localeCompare(charA)
                  : charA.localeCompare(charB);
              }
            });
          } else {
            items.sort((a, b) => {
              const aValue =
                typeof a[sortKey] === "string"
                  ? a[sortKey].toUpperCase()
                  : a[sortKey];
              const bValue =
                typeof b[sortKey] === "string"
                  ? b[sortKey].toUpperCase()
                  : b[sortKey];
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
  data: () => ({
    PlusIcon: PlusIcon,
    itemsPerPage: 5,
    headers: [
      {
        title: "No",
        align: "start",
        sortable: false,
      },
      {
        title: "Kode Produk",
        align: "start",
        sortable: false,
        key: "kodeProduk",
        width: "20%",
      },
      {
        title: "Nama",
        align: "start",
        sortable: false,
        key: "nama",
        width: "20%",
      },
      {
        title: "Tanggal Masuk",
        key: "tanggalMasuk",
        align: "start",
        width: "25%",
      },
      { title: "Stock (dus)", key: "stock", align: "start", width: "15%" },
      { title: "Rak", key: "posisiRak", align: "start" },
      { title: "Edit", key: "actions", align: "start", sortable: false },
    ],
    search: {
      nama: "",
    },
    serverItems: [],
    loading: true,
    totalItems: 0,
  }),
  methods: {
    loadItems({ page, itemsPerPage, sortBy }) {
      this.loading = true;
      FakeAPI.fetch({ page, itemsPerPage, sortBy, search: this.search }).then(
        ({ items, total }) => {
          this.serverItems = items;
          this.totalItems = total;
          this.loading = false;
        },
      );
    },
    searchItems() {
      this.loadItems({
        page: 1,
        itemsPerPage: this.itemsPerPage,
        sortBy: [],
        search: JSON.stringify(this.search),
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
