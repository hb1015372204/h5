<template>
    <div  class="gotop" :style="footIsShow?'margin-bottom:40px':''" >
      <div @click="gotop">返回顶部<i class="iconfont iconup"></i></div>
    </div>
</template>
<script>
export default {
    props:['footIsShow'],
    methods: {
        gotop() {
            var timer = setInterval(function(){
                let osTop = document.documentElement.scrollTop || document.body.scrollTop;
                let ispeed = Math.floor(-osTop / 5); 
                document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
                if(osTop === 0){
                    clearInterval(timer);
                }
            },30)
        },
    }
}
</script>

<style lang="scss" scoped>
.gotop{
  overflow: hidden;
  div{
    width: 98px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    border-radius: 20px;
    border: 1px solid #fff;
    text-align: center;
    margin: 20px auto 35px;
  }
}
</style>