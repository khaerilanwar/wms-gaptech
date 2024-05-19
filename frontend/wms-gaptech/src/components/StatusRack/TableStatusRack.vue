<template>
  <v-card flat>
    <v-card-title class="d-flex align-center justify-center pe-2">     

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field>
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table v-model:search="search" :items="items">
      <template v-slot:header.kapasitas>
        <div class="text-center">Kapasitas</div>
      </template>

      <template v-slot:item.produk="{ item }">
        <div class="text-center">
          <span>{{ item.produk }}</span>
        </div>
      </template>

      <template v-slot:item.kapasitas="{ item }">
        <div class="text-center">
          <span>{{ item.kapasitas }}</span>
        </div>
      </template>

      <template v-slot:item.terisi="{ item }">
        <div class="text-center">
          <span>{{ item.terisi }}</span>
        </div>
      </template>

      <template v-slot:item.status="{ item }">
        <div class="text-center">
          <v-chip
            :color="item.status ? 'green' : 'red'"
            :text="item.status ? 'Tersedia' : 'Rak Penuh'"
            class="text-uppercase"
            size="small"
            label
          ></v-chip>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      items: [
        {
          rak: 'L1-2-2-1',
          kapasitas: 80,
          terisi: 50,
          produk: 'Kertas Glossy',
          status: true,
        },
        {
          rak: 'L2-1-3-2',
          kapasitas: 60,
          terisi: 30,
          produk: 'Kertas Art Carton',
          status: false,
        },
        {
          rak: 'L3-2-1-3',
          kapasitas: 90,
          terisi: 70,
          produk: 'Kertas Ivory',
          status: true,
        },
        {
          rak: 'L2-3-2-1',
          kapasitas: 100,
          terisi: 90,
          produk: 'Kertas Wove',
          status: true,
        },
        {
          rak: 'L1-1-1-1',
          kapasitas: 40,
          terisi: 20,
          produk: 'Kertas Linen',
          status: false,
        },
      ],
    }
  },
}
</script> 
