<template>
  <div class="container">
    <img :src="`${IMGURL}/test-gzcarshow/16064589868881.jpg`" class="bg-img"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      IMGURL: process.env.VUE_APP_BASE_IMGURL,
    }
  }
    
}
</script>

<style lang="scss" scoped>
.container{
  background-color: #000;
}
</style>

