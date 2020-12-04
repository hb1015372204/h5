<template>
    <div  class="videos">
        <div class="pic-default">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide box-border" v-for="(item, index) in contentListChild" :key="index">
                        <div class="box-item">
                            <video :src="item.content"  controls width="1" height="1" :id="`_player${index}`" x5-playsinline="true" webkit-playsinline playsinline class="video" :class="isShow==index?'block':'none'" @click="play(item,index)"></video>
                            <div :src="item.img" class="pic" :class="isShow==index?'none':'block'" :style="`background:url(${item.img}) no-repeat center; background-size: cover;`"></div>
                            <h2 :index="index" :class="isShow==index?'none':'block'" class="textRowOne">{{item.title}}</h2>
                            <a class="play _play" :class="isplay?'none':'block'" data-open="0" @click="play(item,index)"></a>
                        </div>
                    </div>
                </div>
                <div class="swiper-scrollbar">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from '@/swiper/swiper';
import API from '@/api/webH5API';
import { Toast } from 'vant';
export default {
    props: ['types'],
    data() {
        return {
            isShow: -1,
            isplay: false,
            lists: [],
            contentList: {}

        }
    },
    computed:{
        contentListChild(){
            if(this.contentList.children&&this.contentList.children.length>0){
                return this.contentList.children
            }
        }
    },
    mounted() {
        this.init();
        setTimeout(()=>{this.getVideos();},2000)
    },
    methods: {
        async init() {
            let params;
            if (process.env.NODE_ENV === 'development') {// 开发
                params = {root: 4, id: 19, nodecode: 'videoList'}
            }else{// 生产
                params = {root: 1, id: 19, nodecode: 'videoList'};
            }
            this.$emit('getcontent', params);
            const res = await API.getcontent(params);
            if(res.errcode == 0) {
                let data = res.object;
                this.contentList = data;
            }else{
                Toast.fail(res.errmsg);
            }
        },
        getVideos() {
            var that = this;
            new Swiper ('.swiper-container', {
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                spaceBetween : '12%',
                scrollbar: {
                    el: '.swiper-scrollbar',
                },
                on: {
                    touchMove: function() {
                        that.isShow = -1;
                    },
                    //视频切换
                    click: function(){
                        let _thVideo = document.getElementById("_player" + that.isShow);
                        if(_thVideo) {
                            if(that.isplay){
                                _thVideo.pause();
                                that.isplay = false;
                            }else{
                                _thVideo.play();
                                that.isplay = true;
                            }
                        }
                    }
                }
            }) 
        },
        play(item, index) {
            this.isShow = index;
            if(this.isShow == index) {
                this.isplay = true;
                document.getElementById("_player" + index).play();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.videos{position: relative;}
.block{display: block;}
.none{display: none;}
$w: calc(92vw - 200vw * 16 / 750);
$h: 202px;
.pic-default {
     h2 {
         color: #fff;
         font-size: 14px; 
         width: calc(100% - 26px);
         margin: 0px 13px 10px 13px;
         position: absolute;
         bottom: 0px;
    }
    .swiper-container {height: calc(92vw * 404 / 706 + 100vw * 46 / 750);}
    .swiper-slide {
        width: $w;
        height: $h;
        box-sizing: border-box;
        padding: 0 10px;
        &::after{
            width: 100%;
            height: $h;
        }
        .box-item{
            width: $w;
            height: $h;
            margin: 0 10px;
        }
    }
    .swiper-slide-active .video {
        width: $w; height: 100%;object-fit: fill;
    }
    .swiper-slide .pic{width: $w;height: 100%;}
    .play {
        position:absolute;
        top: 50%;
        left: 50%;
        margin-top: calc(100vw / 750 * -37.5);
        margin-left: calc(100vw / 750 * -37.5);
        width: calc(100vw / 750 * 75);
        height: calc(100vw / 750 * 75);
        background:url(../../../images/play.png) no-repeat center;
        background-size: contain;
    }
}

</style>