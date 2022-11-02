import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./model/router/index.js";
import "./assets/css/base.css";
import {createPinia,PiniaVuePlugin} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(PiniaVuePlugin)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);
import {
  Loading,
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
  PullRefresh,
  List,
  Dialog,
  Overlay
} from "vant";

Vue.use(Button);
Vue.use(Overlay);
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
Vue.use(PullRefresh);
Vue.use(List)
Vue.use(Loading)
Vue.use(Dialog);


new Vue({
  pinia,
  render: (h) => h(App),
  router: router,
}).$mount("#app");
