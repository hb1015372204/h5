
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// import Vant from 'vant'
// Vue.use(Vant);
import 'vant/lib/index.css'

import Meta from 'vue-meta';
Vue.use(Meta);

import '@/swiper/swiper.css';

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
