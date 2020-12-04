<template>
    <div  class="videos">
        <div class="pic-default">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item, index) in contentListChild" :key="index">
                        <video :src="item.content"  controls width="1" height="1" :id="`_player${index}`" x5-playsinline="true" webkit-playsinline playsinline class="video" :class="isplay==index?'block':'none'" @click="play(item,index)"></video>
                        <div :src="item.img" class="pic" :class="isplay==index?'none':'block'" :style="`background:url(${item.img}) no-repeat center; background-size: cover;`"></div>
                        <h2 :index="index" :class="isplay==index?'none':'block'" class="textRowOne">{{item.title}}</h2>
                        <a class="play _play" :class="isplay==index?'none':'block'" data-open="0" @click="play(item,index)"></a>
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
            isplay: -1,
            isShow: false,
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
                spaceBetween : '4%',
                scrollbar: {
                    el: '.swiper-scrollbar',
                },
                on: {
                    touchMove: function() {
                        that.isplay = -1;
                    },
                    //视频切换
                    click: function(){
                        let _thVideo = document.getElementById("_player" + that.isplay);
                        if(_thVideo) {
                            if(that.isShow){
                                _thVideo.pause();
                                that.isShow = false;
                            }else{
                                _thVideo.play();
                                that.isShow = true;
                            }
                        }
                        TDAPP.onEvent ('视频切换');
                    }
                }
            }) 
        },
        play(item, index) {
            this.isplay = index;
            if(this.isplay == index) {
                this.isShow = true;
                document.getElementById("_player" + index).play();
            }
            TDAPP.onEvent (`${item.title}`, '', {'播放视频':item.title});
        }
    }
}
</script>

<style lang="scss" scoped>
.videos{position: relative;}
.block{display: block;}
.none{display: none;}
.swiper-scrollbar-drag {background-color: #ffffff;}
.swiper-slide, .pic-default .swiper-slide {
    background-image: url(../../../images/swiper-slide_border.png);
    background-size: contain;background-position: center;
    background-repeat: no-repeat;
    padding: 2vw 0px 0px 2vw;
    box-sizing: border-box;
}

.pic-default {
     h2 {
        color: #fff;
        font-size: 14px; 
        width: calc(92vw - 100vw * 40 / 750);
        margin: 0px calc(100vw * 13 / 750) calc(100vw * 10 / 750) calc(100vw * 13 / 750);
        position: absolute;
        bottom: 0px;
    }
    .swiper-container {height: calc(92vw * 404 / 706 + 100vw * 46 / 750);}
    .swiper-slide {width: 100vw;height: calc(92vw * 404 / 706);padding: calc(100vw * 13 / 750) calc(100vw * 15 / 750 + 4vw) 0px calc(100vw * 15 / 750 + 4vw);overflow: hidden;}
    .swiper-slide-active .video {
        width: calc(92vw - 100vw * 16 / 750); height: 100%;object-fit: fill;
        border-radius: 5px;
    }
    .swiper-slide .pic{width: calc(92vw - 100vw * 16 / 750);height: calc(92vw * 404 / 706 - 100vw * 15 / 750);border-radius: 5px;}
    .play {position:absolute;top: 50%;left: 50%;margin-top: calc(100vw / 750 * -37.5);margin-left: calc(100vw / 750 * -37.5);width: calc(100vw / 750 * 75);height: calc(100vw / 750 * 75);background:url(../../../images/play.png) no-repeat center;background-size: contain;}
    .swiper-button-prev, .swiper-button-next {color: #fff; outline:none}
}

.pic-fullscreen {position: fixed;top: 0;left: 0;height: 100%;width: 100%;border-radius: 0;margin: 0;background:#000; z-index: 8;color: #fff;
    .swiper-slide {height: 100%;width: 100%; display: flex;justify-content: center;flex-flow: column wrap;}
    .swiper-container {height: 100%;}
    .pic {width: 100%; height: 100%; background-size: contain;background-repeat: no-repeat;background-position: center;}
    .swiper-pagination-fraction {top: 10px; bottom: auto;}
}
</style>