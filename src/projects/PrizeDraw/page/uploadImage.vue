<template>
  <div class="container cont">
    <div class="box-upload">
      <van-uploader>
          <van-button icon="plus" class="upload-pic"></van-button>
      </van-uploader>
    </div>
    <div class="box-btn tcenter">
      <van-button type="info" @click="confirmUpload">确认上传</van-button>
      <div>大狗元素下载</div>
    </div>

  </div>
</template>

<script>
import { Dialog } from 'vant';
import jse from '@/utils/jsencrypt'
export default {
    data() {
        return {
        }
    },
    mounted() {
        let asdad = jse.encrypt('哈哈哈哈哈哈')
        console.log(asdad)
    },
    methods: {
      confirmUpload() {
        Dialog.alert({
          width: '6rem',
          message: '恭喜上传成功',
          theme: 'round-button',
          confirmButtonText: '去抽奖',
          confirmButtonColor: '#ccc'
        }).then(() => {
          console.log('去抽奖');
          this.$router.push({ path: '/luck'});
        });
      }
    }
    
}
</script>

<style lang="scss" scoped>
$upWith: 250px;
$upHeight: 150px;
.cont{
  position: relative;
}
.box-upload{
  text-align: center;
  .upload-pic{
    width: $upWith;
    height: $upHeight;
    font-size: 30px;
    color: #ccc;
  }

}
.box-btn{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>

