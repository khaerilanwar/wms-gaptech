<template>
  <section>
    <div
      class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border-2 border-blue-primary mx-auto"
    >
      <div class="p-3">
        <form class="space-y-2 md:space-y-2" action="" method="post">
          <div>
            <label
              for="productName"
              class="block mb-2 text-sm font-medium text-black"
              >Nama Produk Baru</label
            >
            <input
              id="productName"
              type="text"
              name="productName"
              class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary"
              placeholder="Nama produk baru"
              required
            />
          </div>
          <div>
            <label
              for="productPrice"
              class="block mb-2 text-sm font-medium text-black"
              >Harga Produk</label
            >
            <input
              id="productPrice"
              type="text"
              name="productPrice"
              class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary"
              placeholder="Harga produk baru"
              required
            />
          </div>
          <div>
            <label
              for="stockAmount"
              class="block mb-2 text-sm font-medium text-black"
              >Jumlah stok masuk</label
            >
            <input
              id="stockAmount"
              type="text"
              name="stockAmount"
              class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary"
              placeholder="Jumlah stok masuk"
              required
            />
          </div>
          <div>
            <label
              for="rackPosition"
              class="block mb-2 text-sm font-medium text-black"
              >Posisi Rak</label
            >
            <select
              id="rackPosition"
              name="rackPosition"
              class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary"
              required
            >
              <option value="">Pilih posisi rak</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="A3">A3</option>
            </select>
          </div>
        </form>
        <div class="flex items-center justify-center mt-2">
          <ComponentButton intent="primary" class="mr-5"
            >Simpan
          </ComponentButton>
          <ComponentButton intent="danger">Batal</ComponentButton>
        </div>
      </div>
    </div>
    <Notification ref="notification" />
  </section>
</template>

<script>
import ComponentButton from "../ComponentButton.vue";

export default {
  components: {
    ComponentButton,
  },
};
</script>
