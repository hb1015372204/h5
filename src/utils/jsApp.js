import { Toast } from 'vant';

const isQQ = (/\sqq/ig).test(window.navigator.userAgent);
var isDingTalk = (/dingtalk/ig).test(window.navigator.userAgent);
export default {
    // 获取用户信息
    getAppUserInfo() {
        return dsBridge.call("Storage.userInfo")
    },
    // 是否可以查看更多
    isMore(appPageType, pageUrl) {
        console.log(this.changePageUrl(appPageType) + pageUrl)
        if (/haval/i.test(navigator.userAgent) && /fromapp/i.test(navigator.userAgent)) {
            dsBridge.call("NativeController.pushNativeController",{
                url: this.changePageUrl(appPageType) + pageUrl
            });
        } else {
            Toast('下载哈弗智家查看更多内容');
        }
    },
    // 打开app
    openApp(appPageType) {
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
            if(this.isWeiXin() || isQQ || this.isWeiBo()){
                Toast('点击右上角按钮，然后在弹出的菜单中，点击在浏览器中打开');
            }else{
                var state = null;
                try {
                    state = window.open(appPageType);
                } catch(e) {}
                if (!state.close) {
                    window.close();
                }else {
                    setTimeout("window.location.href=\'itms-apps://itunes.apple.com/cn/app/id995525992?mt=8\';",1000);
                }
            }
        } else if (/android/i.test(navigator.userAgent)) {
            if(this.isWeiXin() || isQQ || this.isWeiBo()){
                Toast('点击右上角按钮，然后在弹出的菜单中，点击在浏览器中打开');
            }else{
                var state = null;
                try {
                    state = window.open(appPageType);
                } catch(e) {}

                if (!state.close) {
                    window.close();
                } else {
                    setTimeout("window.location.href=\'http://app.gwmsoft.com/CarConnect/connect.html\';",1000);
                }
            }
        }
    },
    // 切换app跳转页面前缀路径
    changePageUrl(pageSoure) {
        let haval_page_url = '';;
        switch(pageSoure) {
            case 'haval':
                haval_page_url  = 'haval://app/';
                break;
        }
        return haval_page_url;
    },
    isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == "micromessenger"){
            return true;
        }else{
            return false;
        }
    },
    isWeiBo() {
        var ua = navigator.userAgent;
        if(ua.indexOf("Weibo") > -1) {
            return true;
        } else {
            return false;
        }
    },
    // 跳转到原生页面
    goApp(params) {
        if (/haval/i.test(navigator.userAgent) && /fromapp/i.test(navigator.userAgent)) {
            dsBridge.call("NativeController.pushNativeController",{
                url: params,
                fullScreen: 1//1：沉浸式
            });
        } else {
            Toast('下载哈弗智家查看更多内容');
        }
    },
    // 唤起登录
    openLogin() {
        dsBridge.call("NativeController.presentLoginController",{});
    },
    // 直接唤起分享面板
    appShare(params) {
        dsBridge.call("NativeController.presentShare", {
            title: params.title,
            url: params.url,
            description: params.desc,
            img: params.icon || "havalIcon",//默认的分享icon为APP的图标，havalIcon、weyIcon、oraIcon
            imgUrl: params.iconUrl,//优先使用分享icon链接，没有值就使用img的app图标
            official:true//表明是否是官方内容，true：分享面板隐藏举报选项
        });
    },
    // 设置右上角更多按钮，点击更多按钮后唤起分享面板
    appRightShare(params) {
        if (/haval/i.test(navigator.userAgent) && /fromapp/i.test(navigator.userAgent)) {
           try {
                //设置右上角按钮
                var pbtns = {
                    right: [{ img: "more", func: "pushShare" }]
                };
                dsBridge.call("Controller.refreshNav", pbtns);
                dsBridge.register("pushShare", function() {
                    dsBridge.call("NativeController.presentShare", {
                        title: params.title,
                        url: params.url || window.location.href,
                        description: params.desc,
                        img: params.icon || "havalIcon",
                        imgUrl: params.iconUrl,
                    });
                });
            }catch(err){
                console.log(err);
            }
        }else{
            return true;
        }
    }
}