
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "index",
            component: () => import(/* webpackChunkName: "home" */ "./page/index.vue"),
            meta: {
                title: '首页'
            }
        },
        {
            path: "/",
            name: "noAuth",
            component: () => import(/* webpackChunkName: "home" */ "./page/noAuth.vue"),
            meta: {
                title: '没有权限'
            }
        },
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

