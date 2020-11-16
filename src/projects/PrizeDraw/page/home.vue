<template>
    <div class="container">
        <div class="btn-op">
            <p>已有<b>{{dogEmblemJoinNum}}</b>人参与</p>
            <div  @click="goUpload">我要上传</div>
            <div @click="goLike">我要点赞</div>
        </div>
        <div class="box-lucky" >
            <div @click="$router.push({ path: '/luck'})">活动规则</div>
            <div @click="goShare">分享</div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
import API from '../api/h5API'
import relapp from '@/utils/relApp'
export default {
    data() {
        return {
            dogEmblemJoinNum: ''
        }
    },
    created() {
        let params = {
            title: "北京车展哈弗展台，等你来看！",
            desc: "撸猫遛狗开神6，初恋挽着炮和9，买7！",
            icon: "havalIcon",
            iconUrl: "https://imgamp.gwm.com.cn/web/img/activity/bj-car-exhibition/share.jpg"
        }
        relapp.appRightShare(params);
    },
    mounted() {
        console.log(dsBridge)
        this.init();
    },
    methods: {
        async init() {
           const res = await API.getDogInfo();
           if(res.errcode == '0') {
               this.dogEmblemJoinNum = res.object.dogEmblemJoinNum;
           }
        },
        goUpload() {
          this.$router.push({ path: '/uploadImage'});
        },
        goLike() {
          this.$router.push({ path: '/matchList'});
        },
        async goShare() {
           const res = await API.emblemShare();
           if(res.errcode == '0') {
            // relapp.appRightShare("haval://app/home/main");
           }else{
                Toast(res.errmsg);
           }
        },
    }
}
</script>

<style lang="scss" scoped>
.container{
    position: relative;
    text-align: center;
    background: url(../assets/home-bg.jpg) no-repeat;
    background-size: cover;
    .btn-op{
        position: absolute;
        bottom: 10%;
        left: 0;
        right: 0;
        .num{

        }
    }
    .box-lucky{
        position: fixed;
        right: 0;
        top: 30%;
        color: #fff;
    }
}
</style>