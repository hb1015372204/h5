<template>
  <div class="container cont">
    <div class="box-upload">
      <van-uploader v-model="fileList" multiple :max-count="3">
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
import {fetch} from '@/api/http'
import API from '../api/h5API'
import { Dialog, Toast } from 'vant';
import jse from '@/utils/jsencrypt'
export default {
    data() {
        return {
          fileList:[]
        }
    },
    mounted() {
    },
    methods: {
      // 上传图片
      async confirmUpload() {
        let formData  = new FormData();
        this.fileList.forEach(item => {
          formData.append('imglist[]', item.file);
        });
        const res = await API.uploadPics(formData);
        let imgFiles = res.split(';');
        if(imgFiles.length > 0) {
          Dialog.alert({
            width: '6rem',
            message: '恭喜上传成功',
            theme: 'round-button',
            confirmButtonText: '去抽奖',
            confirmButtonColor: '#ccc'
          }).then(() => {
            this.$router.push({ path: '/luck'});
          });
        }
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

