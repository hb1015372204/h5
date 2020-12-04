exports.AppVueTep= `<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
    export default {
        metaInfo: {
            title: '---修改活动title',
            meta: [
                { vmid: 'description', name: 'description', content: '---修改活动描述！！！' }
            ]
        },
    }
</script>
`

/**
 * @msg: vue页面模版
 */
const VueTep = `<template>
  <div class="container">
  
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  mounted() {
  //
  },
    
}
</script>

<style lang="scss" scoped>
</style>

`

exports.mainTep = `
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
`

exports.routerTep = `
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import(/* webpackChunkName: "home" */ "./page/home.vue"),
            meta: {
                title: '首页'
            }
        }
    ]
});

`