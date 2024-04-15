// eslint-disable-next-line no-undef
module.exports = {
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  plugins: ["vue", "prettier"],
  rules: {
    "vue/multi-word-component-names": "off",
    "prettier/prettier": "error",
  },
};
