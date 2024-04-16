# wms-gaptech

This template should help get you started developing with Vue 3 in Vite.

## Table of Contents
- [Project Setup](#Project-Setup)
- [Using Icon with Heroicons](#Using-Icon-with-Heroicons)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Using Icon with Heroicons
Each icon can be imported individually as a Vue component:

```sh
<template>
  <nav>
    <div>
      <!-- use icon -->
      <HomeIcon class="h-6 w-6" />
      <span class="text-sm">Dashboard</span>
    </div>
    <div>
      <!-- use icon -->
      <ArrowRightEndOnRectangleIcon class="h-6 w-6" />
      <span class="text-sm">Barang Masuk</span>
    </div>
  </nav>
</template>

<script>
import {
  HomeIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/vue/24/outline"; //import icon

export default {
  components: {
    HomeIcon,
    ArrowRightEndOnRectangleIcon,
  }, //use the component from import
};
</script>
```
Read the documentation to learn how to import another style of icons [here](https://www.npmjs.com/package/@heroicons/vue) Also, you can view the icons [here](https://heroicons.com/)
