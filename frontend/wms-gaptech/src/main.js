import "./assets/style.css";

import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import "./utils/api";
// import store from "./utils/vuex";

const app = createApp(App);
app.use(router);
// app.use(store);
app.mount("#app");
