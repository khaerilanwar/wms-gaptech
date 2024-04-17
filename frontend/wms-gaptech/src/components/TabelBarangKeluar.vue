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
      <tr :class="diffRowColor(index)">
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
    tglKeluar: "2024-01-01",
  },
  {
    id: "TK-002",
    tglKeluar: "2024-03-05",
  },
  {
    id: "TK-003",
    tglKeluar: "2024-12-17",
  },
  {
    id: "TK-004",
    tglKeluar: "2024-07-15",
  },
  {
    id: "TK-005",
    tglKeluar: "2024-02-22",
  },
  {
    id: "TK-006",
    tglKeluar: "2024-10-27",
  },
  {
    id: "TK-007",
    tglKeluar: "2024-05-19",
  },
  {
    id: "TK-008",
    tglKeluar: "2024-10-09",
  },
  {
    id: "TK-009",
    tglKeluar: "2024-07-31",
  },
  {
    id: "TK-010",
    tglKeluar: "2024-04-19",
  },
  {
    id: "TK-011",
    tglKeluar: "2024-02-29",
  },
  {
    id: "TK-012",
    tglKeluar: "2024-09-01",
  },
  {
    id: "TK-013",
    tglKeluar: "2024-11-10",
  },
  {
    id: "TK-014",
    tglKeluar: "2024-06-18",
  },
  {
    id: "TK-015",
    tglKeluar: "2024-02-14",
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
      { title: "ID Transaksi", key: "id", align: "start", sortable: false },
      {
        title: "Tanggal Keluar",
        key: "tglKeluar",
        align: "start",
      },
      { title: "Action", key: "action", align: "start", sortable: false },
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
    diffRowColor(index) {
      return (index + 1) % 2 !== 0 ? "bg-slate-100" : "";
    },
  },
};
</script>
