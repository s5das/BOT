import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import router from './router/index.js'
  
import { Button , Tabbar, TabbarItem , Uploader} from 'vant';

Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Uploader);


new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
