<template>
  <form class="max-w-xs mx-auto">
    <div class="relative flex items-center">
      <button
        id="decrement-button"
        type="button"
        data-input-counter-decrement="counter-input"
        class="flex-shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none"
        @click="decrement"
      >
        <svg
          class="w-2.5 h-2.5 text-gray-900"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h16"
          />
        </svg>
      </button>
      <input
        id="counter-input"
        type="text"
        data-input-counter
        class="flex-shrink-0 text-gray-900 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
        placeholder=""
        :value="quantity"
        required
      />
      <button
        id="increment-button"
        type="button"
        data-input-counter-increment="counter-input"
        class="flex-shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none"
        @click="increment"
      >
        <svg
          class="w-2.5 h-2.5 text-gray-900 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    kodeprod: {
      type: Number,
      required: true,
    },
  },
  emits: ["quantity-changed"],
  data() {
    return {
      quantity: 0,
    };
  },
  methods: {
    increment: function () {
      if (this.quantity >= 0) {
        this.quantity++;
        this.$emit("quantity-changed", {
          kodeprod: this.kodeprod,
          quantity: this.quantity,
        });
      }
    },
    decrement: function () {
      if (this.quantity > 0) {
        this.quantity--;
        this.$emit("quantity-changed", {
          kodeprod: this.kodeprod,
          quantity: this.quantity,
        });
      }
    },
  },
};
</script>
