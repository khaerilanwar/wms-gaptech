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
            Nama Pengguna
          </label>
          <input
            id="recipientName"
            type="text"
            class="shadow-sm focus:border-blue-500 w-full rounded-md border border-slate-400 p-2"
            placeholder="Masukkan nama pengguna"
            required
          />
        </div>

        <div class="mb-5">
          <label
            for="recipientAddress"
            class="block text-gray-700 text-sm font-medium mb-2"
          >
            Alamat Penerima
          </label>
          <textarea
            id="recipientAddress"
            class="shadow-sm focus:border-blue-500 w-full rounded-md border border-slate-400 p-2"
            rows="5"
            placeholder="Masukkan alamat penerima"
            required
          ></textarea>
        </div>

        <div class="mt-4">
          <button
            type="submit"
            class="bg-blue-500 text-white font-medium rounded-md shadow-sm px-4 py-2 hover:bg-blue-600"
          >
            Kirim Pesan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script></script>
