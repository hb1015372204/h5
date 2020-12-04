<template>
  <div class="container">
    <!-- 车展介绍 -->
    <div class="carInfo">
      <img :src="`${IMGURL}/test-gzcarshow/16059239203086.jpg`" style="width: 100%; -webkit-user-select: none;background-position: 0px 0px, 10px 10px;background-size: 20px 20px;cursor: zoom-out;">
      <div class="boxst_s" :class="isSticty?'isSticty':''">
        <ul class="box-sticky">
          <li v-for="(item, index) in typeList" :key="index" :class="isactive==index?'active':''" @click="handleTitle(index)" :data-to="index">{{item.name}}</li>
        </ul>
      </div>
    
      <div class="box-hd mt15 tcenter" >
      <img :src="`${IMGURL}/test-gzcarshow/16058398856097.png`" class="btn-img btn-zxjj"/>
      </div>
    </div>
    <div class="hd-content">
      <!-- 资讯聚焦 -->
      <Works class="mt35 pro0" :types="'zxjj'" ref="0"/>
      <!-- 视频 -->
      <Videos class="mt30 "/>

      <!-- 精彩互动活动 -->
      <Activities class=" pro1"  ref="1" :types="'hdhd'"/>

      <!-- 优质作品 -->
      <Works class=" pro2" ref="2" :types="'yzzp'"/>

      <!-- 新车预售 -->
      <Activities class=" pro3"  ref="3" :types="'xcys'"/>

      <!-- 精彩图集 -->
      <Atlas class=" pro4" ref="4" />
    </div>

    <GoTop :footIsShow="footIsShow"/>
    
    <Footer v-if="footIsShow" />
  </div>
</template>

<script>
import Videos from '../components/videos'
import Activities from '../components/activities'
import Works from '../components/works'
import Atlas from '../components/atlas'
import Footer from '@/components/footer'
import GoTop from '@/components/goTop'
import jsApp from '@/utils/jsApp'
export default {
  components:{
    Videos,
    Activities,
    Works,
    Atlas,
    Footer,GoTop
  },
  data() {
    return {
      IMGURL: process.env.VUE_APP_BASE_IMGURL,
      footIsShow: false,
      isactive: 0,
      typeList: [
        {id: 0, name: '资讯聚焦'},
        {id: 1, name: '互动活动'},
        {id: 2, name: '优质作品'},
        {id: 3, name: '新车预售'},
        {id: 4, name: '精彩图集'},
      ],
      isSticty: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    
    let params ={ title: "广州车展哈弗展台，等你来看！",
        url: window.location.href,
        desc: "撸猫遛狗开神6，初恋挽着炮和9，买7！",
        icon: "havalIcon",
        iconUrl: "https://imgamp.gwm.com.cn/web/img/activity/bj-car-exhibition/share.jpg"
    };
    this.footIsShow = jsApp.appRightShare(params);
  },
  methods:{
    handleTitle(el) {
      this.isactive = el;
      let _this = this,speed=50;
      let windowH = window.innerHeight;
      let h = this.$refs[el].$el.offsetHeight;
      let t = this.$refs[el].$el.offsetTop;
      let top = t - (windowH - h) / 3;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let currentTop = scrollTop;
      let requestId;
      //采用requestAnimationFrame，平滑动画
      function step() {
        if (scrollTop < top) {
          if (currentTop <= top) {
            window.scrollTo(0, currentTop);
            requestId = window.requestAnimationFrame(step);
          } else {
            window.cancelAnimationFrame(requestId);
          }
          //向下滚动
          currentTop += speed;
        } else {
          if (top <= currentTop) {
            //注：此处 - speed 是解决居中时存在的问题，可自行设置或去掉
            window.scrollTo(0, currentTop - speed);
            requestId = window.requestAnimationFrame(step);
          } else {
            window.cancelAnimationFrame(requestId);
          }
          //向上滚动
          currentTop -= speed;
        }
      }
      window.requestAnimationFrame(step);
    },
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if(scrollTop<=400){
        this.isSticty = false;
      }else{
        this.isSticty = true;
      }
      if(scrollTop<50) {this.isactive = 0}
      var text = document.querySelector(".hd-content"),
      textChild = text.children;
      for(var i=0;i<textChild.length;i++){
        if(scrollTop>= textChild[i].offsetTop){
          this.isactive = i
        }
      }
    },
    debounce(fun, delay) {
      return function(args) {
        let that = this
        let _args = args
        clearTimeout(fun.id)
        fun.id = setTimeout(function() {
            fun.call(that, _args)
        }, delay)
      }
    }
  },
  destroyed () {//离开该页面需要移除这个监听的事件
    window.removeEventListener('scroll', this.handleScroll)
  },
    
}
</script>

<style lang="scss" scoped>
.mt35{margin-top: 35px;}

.btn-img{
  width: 200px;
  margin: 0 auto;
}
.carInfo{
  position: relative;
  .btn-zxjj{
    position: absolute;
    left: 0;
    right: 0;
    bottom: -25px;
  }
}
.btn-hdhd{
  margin-top: 60px;
}
.boxst_s{
  width: calc(100vw -40);
  padding: 0 20px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(100vw * 150 / 750);
}

.box-sticky{
  width: calc(100vw -30);
  // margin: 0 30px;
  background-color: rgba(18, 20, 71, 0.8);
  border-radius: 65px;
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 14px;
  padding: 18px 15px;
  li{
    text-align: center;
    transform: scale(.9);
  }
  .active{
    font-weight: bold;
    &:after{
      content:'';
      display: block;
      height: 3px;
      background-color: #FFBD5F;
      border-radius: 2px;
      margin-top: 8px; 
    }
  }
}
.isSticty{
  position: fixed;top: 0;z-index: 999;
  background-color: #121447;border-radius: 0;
  height: 60px;
  overflow: hidden;
  .box-sticky{
    padding: 18px 0;
  }
}
</style>

