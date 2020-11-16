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

        },
        {
            path: "/about",
            name: "about",
            component: () => import(/* webpackChunkName: "about" */ "./page/About.vue")
        }
    ]
});
