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
    </div>
  </div>
</template>
<script></script>
