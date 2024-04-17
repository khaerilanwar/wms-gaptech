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
      <tr>
        <td>{{ index + 1 }}</td>
        <td>{{ item.id }}</td>
        <td>{{ item.tglKeluar }}</td>
        <td class="flex">
          <div class="mt-3">
            <router-link to="/barang-keluar/detail">
              <button>
                <ComponentButton intent="edit"></ComponentButton>
              </button>
            </router-link>
            <button>
              <ComponentButton intent="delete"></ComponentButton>
            </button>
          </div>
        </td>
      </tr>
    </template>
  </v-data-table-server>
</template>

<script>
import ComponentButton from "./ComponentButton.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";

const barangKeluar = [
  {
    id: "TK-001",
    tglKeluar: "01-01-2024",
  },
  {
    id: "TK-002",
    tglKeluar: "05-03-2024",
  },
  {
    id: "TK-003",
    tglKeluar: "17-12-2024",
  },
  {
    id: "TK-004",
    tglKeluar: "15-07-2024",
  },
  {
    id: "TK-005",
    tglKeluar: "22-02-2024",
  },
  {
    id: "TK-006",
    tglKeluar: "27-10-2024",
  },
  {
    id: "TK-007",
    tglKeluar: "19-05-2024",
  },
  {
    id: "TK-008",
    tglKeluar: "09-10-2024",
  },
  {
    id: "TK-009",
    tglKeluar: "31-07-2024",
  },
  {
    id: "TK-010",
    tglKeluar: "19-04-2024",
  },
  {
    id: "TK-011",
    tglKeluar: "29-02-2024",
  },
  {
    id: "TK-012",
    tglKeluar: "01-09-2024",
  },
  {
    id: "TK-013",
    tglKeluar: "10-11-2024",
  },
  {
    id: "TK-014",
    tglKeluar: "18-06-2024",
  },
  {
    id: "TK-015",
    tglKeluar: "14-02-2024",
  },
];

const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const items = barangKeluar.slice();

        if (sortBy.length) {
          const sortKey = sortBy[0].key;
          const sortOrder = sortBy[0].order;
          if (sortKey === "tglKeluar") {
            items.sort((a, b) => {
              const aValue = a[sortKey];
              const bValue = b[sortKey];
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
      },
      { title: "ID Transaksi", key: "id", align: "start" },
      {
        title: "Tanggal Keluar",
        key: "tglKeluar",
        align: "start",
        sortable: true,
      },
      { title: "Action", key: "action", align: "start" },
    ],
    serverItems: [],
    loading: true,
    totalItems: 0,
  }),
  methods: {
    loadItems({ page, itemsPerPage, sortBy }) {
      this.loading = true;
      FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
        this.serverItems = items;
        this.totalItems = total;
        this.loading = false;
      });
    },
  },
};
</script>
