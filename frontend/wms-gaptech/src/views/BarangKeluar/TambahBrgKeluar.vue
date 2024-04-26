<template>
  <div class="p-3 h-full">
    <div class="bg-white border p-4 shadow-md rounded-md">
      <h1 class="text-xl font-semibold">Barang Keluar</h1>
    </div>

    <div class="bg-white border p-4 mt-3 shadow-md rounded-md">
      <h1 class="text-lg font-semibold px-8 pt-6">Data Penerima</h1>

      <form class="px-8 pt-6 pb-8">
        <div class="mb-5">
          <label
            for="recipientName"
            class="block text-gray-700 text-sm font-medium mb-2"
            >Nama Pemesan</label
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
            >Alamat Pengiriman</label
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
      </form>
    </div>

    <!-- Tabel untuk menampilkan data produk -->
    <div class="mt-3">
      <v-card class="pb-4 pt-5">
        <template #text>
          <v-text-field
            v-model="search"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
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
              <td>{{ item.harga }}</td>
              <td>
                <QuantityBtn @quantity-changed="handleQuantity"></QuantityBtn>
              </td>
            </tr>
          </template>
        </v-data-table>
        <p class="p-5 m-5">Total Harga : {{ orders.totalPrice }}</p>
        <div class="flex justify-center items-center p-5 m-5">
          <button
            type="submit"
            class="bg-blue-500 text-white font-medium rounded-md shadow-sm px-4 py-2 hover:bg-blue-600"
            @click="submitOrder"
          >
            Submit
          </button>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/utils/api";
import QuantityBtn from "@/components/QuantityBtn.vue";

export default {
  components: {
    QuantityBtn,
  },
  emits: ["submit-order"],
  data() {
    return {
      recipientName: "",
      recipientAddress: "",
      quantity: 0,
      search: "",
      selected: [],
      headers: [
        {
          title: "Nama Produk",
          align: "start",
          key: "namaProduk",
          sortable: false,
        },
        { title: "Harga", align: "start", key: "harga" },
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
        quantity: 0,
        totalPrice: 0,
      },
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        this.loading = true;
        const response = await axiosInstance.get("products");
        this.loading = false;
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
        this.loading = false;
      }
    },
    diffRowColor(index) {
      return index % 2 === 0 ? "bg-gray-100" : "";
    },
    handleQuantity(quantity) {
      this.quantity = quantity;
    },

    submitOrder() {
      this.orders.recipientName = this.recipientName;
      this.orders.recipientAddress = this.recipientAddress;
      this.orders.items = this.selected.map((item) => {
        return {
          id: item._id,
          namaProduk: item.namaProduk,
          harga: item.harga,
        };
      });
      this.orders.quantity = this.quantity;
      this.orders.totalPrice = this.orders.items.reduce((total, item) => {
        return total + item.harga * this.orders.quantity;
      }, 0);
      console.log(this.orders);
      this.$emit("submit-order", this.orders);
    },
  },
};
</script>
