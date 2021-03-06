
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant);

import Meta from 'vue-meta';
Vue.use(Meta);

import '@/styles/global.scss';
import '@/styles/reset.scss';

import 'lib-flexible'

import VConsole from 'vconsole'
if (process.env.NODE_ENV === 'development') {
  new VConsole()
}

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
