
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const pagePath = './page/';

export default new Router({
    routes: [
        {
            path: "/",
            name: "luck",
            component: () => import(/* webpackChunkName: "home" */ `${pagePath}home`),
            meta: {
                title: '首页'
            }
        },
        {
            path: "/matchList",
            name: "matchList",
            component: () => import(/* webpackChunkName: "uploadImage" */ `${pagePath}matchList/index`),
            meta: {
                title: '会徽列表'
            }
        },
        {
            path: "/luck",
            name: "luck",
            component: () => import(/* webpackChunkName: "uploadImage" */ `${pagePath}luck`),
            meta: {
                title: '抽奖环节'
            }
        },
        {
            path: "/uploadImage",
            name: "uploadImage",
            component: () => import(/* webpackChunkName: "uploadImage" */ `${pagePath}uploadImage`),
            meta: {
                title: '上传作品'
            }
        },
    ]
});

