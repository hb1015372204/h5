<template>
    <footer class="foot-bar">
        <img class="logo" src="https://havalclub-cdn.haval.com.cn/html/icon/havalLogo.png">
        <span>哈弗智家</span>
        <button class="assc-share" @click="openApp()">去看看</button>
    </footer>
</template>
<script>
import jsApp from '@/utils/jsApp'
export default {
    data() {
        return{

        }
    },
    methods: {
        openApp() {
            jsApp.openApp('haval://app/home/main');
        }
    }
}
</script>
<style lang="scss" scoped>

footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 70px;
    line-height:70px;
    background-color: #FFFFFF;
    border-top: 1px solid #979797;
    padding: 0 5px;
    box-sizing: border-box;
    z-index: 600;
}
footer .logo {
    width: 40px;
    height: 40px;
    margin-top: 15px;
    margin-right: 10px;
    vertical-align: top;
}
footer span {
    font-size: 14px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: #0B0B0B;
}
footer button {
    float: right;
    width: 60px;
    height: 30px;
    margin: 15px 0;
    background-color: #258FFF;
    border-width: 0;
    color: #FFFFFF;
    border-radius: 5px;
    line-height: 30px;
    position: absolute;
    right: 16px;
}
</style>