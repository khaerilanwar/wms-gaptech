<template>
  <div></div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  methods: {
    showError(message) {
      toast(message, {
        type: "error",
        position: "bottom-right",
        transition: "slide",
        dangerouslyHTMLString: true,
      });
    },
    showSuccess(message) {
      toast(message, {
        type: "success",
        position: "bottom-right",
        transition: "slide",
        dangerouslyHTMLString: true,
      });
    },
    showInfo(message) {
      toast(message, {
        type: "info",
        position: "bottom-right",
        transition: "slide",
        dangerouslyHTMLString: true,
      });
    },
  },
};
</script>
