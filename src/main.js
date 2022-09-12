import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import VueRouter from "vue-router";
Vue.use(VueRouter);

import router from "./router/index.js";
import "./assets/css/base.css";

import {
  Button,
  Tabbar,
  TabbarItem,
  Uploader,
  Field,
  Form,
  Popup,
  Picker,
  DatetimePicker,
  Cell,
  CellGroup,
  Calendar,
  Icon,
} from "vant";

Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Uploader);
Vue.use(Form);
Vue.use(Field);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(DatetimePicker);
Vue.use(Cell);
Vue.use(CellGroup);

Vue.use(Calendar);
Vue.use(Icon);

new Vue({
  render: (h) => h(App),
  router: router,
}).$mount("#app");
