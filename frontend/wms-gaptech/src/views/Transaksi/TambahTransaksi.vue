<template>
  <div class="p-3 h-full">
    <!-- Loader -->
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>

    <div v-else>
      <button
        class="flex items-center hover:text-blue-primary mb-3"
        @click="goBack"
      >
        <ChevronLeftIcon class="h-6 w-6" />
        <span class="text-sm">Kembali</span>
      </button>
      <div class="bg-white border p-4 shadow-md rounded-md">
        <h1 class="text-xl font-semibold">Tambah Transaksi</h1>
      </div>

      <form @submit.prevent="submitOrder">
        <div class="bg-white border p-5 mt-3 shadow-md rounded-md">
          <h1 class="text-lg font-semibold pb-4 pt-2">Data Penerima</h1>
          <div class="mb-5">
            <label
              for="recipientName"
              class="block text-gray-700 text-sm font-medium mb-2"
              >Nama Pemesan <span class="text-red-secondary">*</span></label
            >
            <input
              id="recipientName"
              v-model="recipientName"
              type="text"
              class="shadow-sm focus:border-blue-700 w-full rounded-md border border-blue-500 p-2"
              placeholder="Masukkan Nama Pemesan"
              required
            />
          </div>
          <div class="mb-5">
            <label
              for="recipientAddress"
              class="block text-gray-700 text-sm font-medium mb-2"
              >Alamat Pengiriman
              <span class="text-red-secondary">*</span></label
            >
            <textarea
              id="recipientAddress"
              v-model="recipientAddress"
              class="shadow-sm focus:border-blue-700 w-full rounded-md border border-blue-500 p-2"
              rows="5"
              placeholder="Masukkan Alamat Pengiriman"
              required
            ></textarea>
          </div>
        </div>

        <!-- Tabel untuk menampilkan data produk -->
        <div class="mt-3">
          <v-card class="pb-4 pt-5">
            <template #text>
              <v-text-field
                v-model="search"
                variant="outlined"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                hide-details
                single-line
              ></v-text-field>
            </template>
            <v-data-table
              v-model="selected"
              :headers="headers"
              :items="products"
              item-value="name"
              items-per-page="5"
              :loading="loading"
              :search="search"
              :items-per-page-options="[
                { value: 10, title: '10' },
                { value: 25, title: '25' },
                { value: 50, title: '50' },
                { value: 100, title: '100' },
              ]"
              return-object
              show-select
              color="primary"
              dense
            >
              <template #item="{ item, index }">
                <tr :class="diffRowColor(index)">
                  <td class="pt-4 pl-2">
                    <v-checkbox
                      v-model="selected"
                      :value="item"
                      color="primary"
                      dense
                    ></v-checkbox>
                  </td>
                  <td>{{ item.namaProduk }}</td>
                  <td>{{ $filters.currency(item.harga) }}</td>
                  <td>
                    <v-chip :color="changeColorForStock(item.stok)">
                      {{ item.stok }}
                    </v-chip>
                  </td>
                  <td>
                    <QuantityBtn
                      :stok="item.stok"
                      :kodeprod="item.kodeProduk"
                      @quantity-changed="handleQuantity"
                    ></QuantityBtn>
                  </td>
                </tr>
              </template>
            </v-data-table>
            <pre> {{ selected }}</pre>
            <p class="p-5 m-5">
              Total Harga : {{ $filters.currency(orders.totalPrice) }}
            </p>
            <div class="flex justify-center items-center p-5 m-5">
              <ComponentButton intent="primary">Submit</ComponentButton>
            </div>
          </v-card>
        </div>
      </form>
    </div>
  </div>
  <Notification ref="notification" />
</template>

<script>
import axiosInstance from "@/utils/api";
import QuantityBtn from "@/components/QuantityBtn.vue";
import Notification from "@/components/Notification.vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import ComponentButton from "@/components/ComponentButton.vue";

export default {
  components: {
    QuantityBtn,
    Notification,
    ChevronLeftIcon,
    ComponentButton,
  },
  emits: ["submit-order"],
  data() {
    return {
      recipientName: "",
      recipientAddress: "",
      search: "",
      selected: [],
      isLoading: true,
      headers: [
        {
          title: "Nama Produk",
          align: "start",
          key: "namaProduk",
          sortable: false,
        },
        { title: "Harga", align: "start", key: "harga" },
        {
          title: "Stok",
          align: "start",
          key: "stok",
          sortable: false,
        },
        {
          title: "Kuantitas",
          align: "start",
          key: "add",
          sortable: false,
        },
      ],
      products: [],
      loading: false,
      orders: {
        recipientName: "",
        recipientAddress: "",
        items: [],
        totalPrice: 0,
      },
    };
  },
  created() {
    setTimeout(() => {
      this.fetchProducts();
    }, 1000);
  },

  methods: {
    async fetchProducts() {
      try {
        const response = await axiosInstance.get("products");
        this.products = response.data;
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching products:", error);
        this.loading = false;
      }
    },
    goBack() {
      const isConfirmed = window.confirm(
        "Apakah Anda yakin ingin meninggalkan halaman ini?",
      );
      if (isConfirmed) {
        this.$router.push("/daftar-transaksi");
      }
    },
    diffRowColor(index) {
      return index % 2 === 0 ? "bg-gray-100" : "";
    },
    changeColorForStock(stock) {
      if (stock > 100) return "green";
      else if (stock > 50) return "orange";
      else return "red";
    },
    handleQuantity(dataQuantity) {
      const index = this.selected.findIndex(
        (item) => item.kodeProduk === dataQuantity.kodeprod,
      );

      if (!this.selected[index].quantity) {
        this.selected[index].quantity = 0;
      }

      if (dataQuantity.quantity > this.selected[index].quantity) {
        // Increment
        const requestedQuantity =
          dataQuantity.quantity - this.selected[index].quantity;

        if (this.selected[index].stok >= requestedQuantity) {
          this.selected[index].quantity = dataQuantity.quantity;
          this.selected[index].stok -= requestedQuantity;
        }
      } else {
        // Decrement
        this.selected[index].stok +=
          this.selected[index].quantity - dataQuantity.quantity;
        this.selected[index].quantity = dataQuantity.quantity;
      }
    },

    async submitOrder() {
      this.orders.recipientName = this.recipientName;
      this.orders.recipientAddress = this.recipientAddress;
      this.orders.items = this.selected.map((item) => {
        return {
          kodeProduk: item.kodeProduk,
          namaProduk: item.namaProduk,
          harga: item.harga,
          quantity: item.quantity,
        };
      });
      this.orders.totalPrice = this.orders.items.reduce((total, item) => {
        return total + item.harga * item.quantity;
      }, 0);

      const orderData = {
        namaPemesan: this.orders.recipientName,
        alamatPengiriman: this.orders.recipientAddress,
        barangKeluar: this.orders.items.map((item) => ({
          kodeProduk: item.kodeProduk,
          kuantitas: item.quantity,
        })),
      };
      try {
        const isConfirmed = window.confirm(
          "Apakah anda yakin ingin menambahkan transaksi?",
        );
        if (isConfirmed) {
          await axiosInstance.post("transaction", orderData);
          this.$refs.notification.showSuccess("Transaksi berhasil ditambahkan");

          this.recipientName = "";
          this.recipientAddress = "";
          this.selected = [];
          this.orders.totalPrice = 0;
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat mengirim pesanan:", error);
      }
    },
  },
};
</script>
