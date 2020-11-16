import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "index",
            component: () => import(/* webpackChunkName: "index" */ "./page/index.vue"),
            meta: {
                title: '首页'
            }

        },
        {
            path: "/about",
            name: "about",
            component: () => import(/* webpackChunkName: "about" */ "./page/About.vue")
        }
    ]
});
