import { createApp } from "vue";
import App from "./App.vue";
import "./assets/output.css";

if (process.env.NODE_ENV === "production") {
  Vue.config.devtools = false;
  Vue.config.productionTip = false;
}

createApp(App).mount("#app");
