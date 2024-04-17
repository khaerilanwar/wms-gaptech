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
          >
            Nama Pemesan
          </label>
          <input
            id="recipientName"
            type="text"
            class="shadow-sm focus:border-blue-500 w-full rounded-md border border-slate-400 p-2"
            placeholder="Masukkan Nama Pemesan"
            required
          />
        </div>

        <div class="mb-5">
          <label
            for="recipientAddress"
            class="block text-gray-700 text-sm font-medium mb-2"
          >
            Alamat Pengiriman
          </label>
          <textarea
            id="recipientAddress"
            class="shadow-sm focus:border-blue-500 w-full rounded-md border border-slate-400 p-2"
            rows="5"
            placeholder="Masukkan Alamat Pengiriman"
            required
          ></textarea>
        </div>
        <div class="mt-4">
          <button
            type="submit"
            class="bg-blue-500 text-white font-medium rounded-md shadow-sm px-4 py-2 hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>

    <div class="bg-white border p-4 mt-3 shadow-md rounded-md">
      <div class="flex items-center place-content-between mt-12">
        <div class="ml-10">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            class="w-4 h-4 mt-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="default-checkbox"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Select All Items</label
          >
        </div>
        <form action="" class="mb-2">
          <div class="flex items-center ml-10">
            <label
              for="search"
              class="mr-2 mt-3 text-sm font-medium leading-6 text-gray-900 mb-2"
              >Search</label
            >
            <div class="flex items-center border-2 rounded h-8 mr-8 ml-2">
              <input type="text" class="flex-grow" name="search" />
              <button>
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400 m-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="desserts"
        item-value="name"
        items-per-page="5"
        return-object
        show-select
      ></v-data-table>

      <pre>{{ selected }}</pre>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: [],
      headers: [
        {
          title: "Dessert (100g serving)",
          align: "start",
          key: "name",
        },
        { title: "Calories", align: "end", key: "calories" },
        { title: "Fat (g)", align: "end", key: "fat" },
        { title: "Carbs (g)", align: "end", key: "carbs" },
        { title: "Protein (g)", align: "end", key: "protein" },
        { title: "Iron (%)", align: "end", key: "iron" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: 1,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: 7,
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: 8,
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: 16,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: 0,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: 2,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: 45,
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: 22,
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: 6,
        },
      ],
    };
  },
};
</script>
