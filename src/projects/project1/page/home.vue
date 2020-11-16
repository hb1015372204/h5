<template>
  <div class="home">
  活动页面1 的测试页面
  <van-loading />
  </div>
</template>

<script>
import { Loading } from "vant";
export default {
  name: "home",
  components: {
  },
  metaInfo: {
    title: '活动1',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0,viewport-fit=cover' },
      { vmid: 'description', name: 'description', content: '我是描述！！！' }
    ]
  },
  mounted() {
  }
};

</script>

<style lang="scss" scoped>
.home{
  font-size: 28px;
}
</style>
