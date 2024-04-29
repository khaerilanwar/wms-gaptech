<template>
  <component :is="props.as" type="submit" :class="buttonClass">
    <component :is="leftIcon" class="w-5 h-5" />
    <slot />
    <component :is="props.rightIcon" class="w-5 h-5" />
  </component>
</template>

<script setup>
import { computed } from "vue";
import { cva } from "class-variance-authority";
import {
  TrashIcon,
  PencilSquareIcon,
  PlusIcon,
  EllipsisVerticalIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
  leftIcon: {
    type: Function,
    default: null,
  },
  rightIcon: {
    type: Function,
    default: null,
  },
  as: {
    type: [String, Object],
    default: "button",
  },
  intent: {
    type: String,
    default: "primary",
    validator: (val) =>
      [
        "primary",
        "primary_full_width",
        "info",
        "delete",
        "edit",
        "add",
        "danger",
      ].includes(val),
  },
});

const buttonClass = computed(() => {
  return cva("text-sm text-white font-medium rounded-lg ", {
    variants: {
      intent: {
        primary:
          "inline-flex items-center bg-blue-primary hover:bg-blue-secondary min-h-[32px] px-3 py-0.5 gap-1",
        primary_full_width:
          " w-full items-center text-center bg-blue-primary hover:bg-blue-secondary min-h-[32px] px-3 py-0.5",
        danger:
          "inline-flex items-center bg-red-primary hover:bg-red-secondary min-h-[32px] px-3 py-0.5 gap-1",
        info: "py-1 px-1 mr-1 bg-grey-primary hover:bg-grey-secondary",
        delete: "py-1 px-1 mr-1 bg-red-primary hover:bg-red-secondary",
        edit: "py-1 px-1 mr-1 bg-yellow-primary hover:bg-yellow-secondary",
        add: "py-1 px-1 mr-1 bg-green-primary hover:bg-green-secondary",
      },
    },
  })({ intent: props.intent });
});

const leftIcon = computed(() => {
  if (props.intent === "delete") {
    return TrashIcon;
  } else if (props.intent === "edit") {
    return PencilSquareIcon;
  } else if (props.intent === "info") {
    return EllipsisVerticalIcon;
  } else if (props.intent === "add") {
    return PlusIcon;
  }
  return props.leftIcon;
});
</script>

<style lang="scss" scoped></style>
