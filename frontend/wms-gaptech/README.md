# wms-gaptech

This template should help get you started developing with Vue 3 in Vite.

## Table of Contents
- [Project Setup](#Project-Setup)
- [Using Icon with Heroicons](#Using-Icon-with-Heroicons)
- [Using Component Button](#Using-Component-Button)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
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

## Using Component Button
The ComponentButton component provides a versatile button with different intents and optional icons.

![Screenshot 2024-04-16 153737](https://github.com/khaerilanwar/wms-gaptech/assets/91649121/5291cfef-3ac3-4db2-922f-ef9332c38457)

Below is an example of using ComponentButton:

```sh
<template>
  <div class="h-full">
    <!-- DELETE -->
    <ComponentButton intent="delete"></ComponentButton>

    <!-- EDIT -->
    <ComponentButton intent="edit"></ComponentButton>

    <!-- MORE INFO -->
    <ComponentButton intent="info"></ComponentButton>

    <div class="flex gap-5 py-5">
      <p>Primary</p>
      <ComponentButton intent="primary">Tambah Barang</ComponentButton>
    </div>

    <div class="flex gap-5">
      <p>Primary left icon</p>
      <ComponentButton intent="primary" :left-icon="HomeIcon"
        >Tambah Barang</ComponentButton
      >
    </div>

    <div class="flex gap-5 py-5">
      <p>Primary right icon</p>
      <ComponentButton intent="primary" :right-icon="HomeIcon"
        >Tambah Barang</ComponentButton
      >
    </div>

    <div>
      <p>Primary full width</p>
      <ComponentButton intent="primary_full_width"
        >Tambah Barang</ComponentButton
      >
    </div>

    <!-- Example using router link -->
    <div>
      <p>Button to another page</p>
      <router-link to="/"
        ><ComponentButton intent="primary"
          >Tambah Barang</ComponentButton
        ></router-link
      >
    </div>
  </div>
</template>

<script>
import ComponentButton from "@/components/ComponentButton.vue";
import { HomeIcon } from "@heroicons/vue/24/outline";
export default {
  components: {
    ComponentButton,
  },
  data() {
    return {
      HomeIcon: HomeIcon,
    };
  },
};
</script>

<style lang="scss" scoped></style>
```
Feel free to customize the styling of the buttons in the `ComponentButton` file according to your project's requirements.
