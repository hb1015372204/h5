<template>
  <div class="container cont">
    <div class="box-upload">
      <van-uploader v-model="fileList" multiple :max-count="3" :after-read="afterRead" :before-read="beforeRead">
          <van-button icon="plus" class="upload-pic"></van-button>
      </van-uploader>
      <p>上传要求：建议尺寸800*800px，格式支持JPG、JPEG、PNG等，上传2M以内。</p>
    </div>
    <van-field v-model="club" type="text" />
    <div class="box-btn tcenter">
      <van-button type="info" @click="confirmUpload">确认上传</van-button>
      <div @click="downPicMaterial">大狗元素下载</div>
    </div>

  </div>
</template>

<script>
import common from '@/utils/common';
import API from '@/api/webH5API';
import { Dialog, Toast } from 'vant';
import jse from '@/utils/jsencrypt'
export default {
    data() {
        return {
          fileList:[],
          club:'',
          imgInfos: []
        }
    },
    mounted() {
    },
    methods: {
      // 上传图片
      async afterRead() {
        let formData  = new FormData();
        this.fileList.forEach(item => {
          formData.append('imglist[]', item.file);
        });
        const res = await API.uploadPics(formData);
        this.imgInfos = res;
      },
      beforeRead(file) {
        if (file.type !== 'image/jpeg') {
          Toast('请上传 jpg 格式图片');
          return false;
        }
        return true;
      },
      // 确认提交
      async confirmUpload() {
        const res = await API.emblemInfoSubmit({emblem: this.imgInfos, club: this.club});
        if(res.errcode == 0) {
          Dialog.alert({
            width: '6rem',
            message: '恭喜上传成功',
            theme: 'round-button',
            confirmButtonText: '去抽奖',
            confirmButtonColor: '#ccc'
          }).then(() => {
            this.$router.push({ path: '/luck'});
          });
        }else{
          Toast.fail(res.errmsg);
        }
      },
      // 获取图片素材
      async downPicMaterial() {
        const res = await API.getcontent({root: 1, id: 3, nodecode: 'share'});
        if(res.errcode == 0) {
          let data = res.object;
          common.downloadByBlob(data.img, data.title)
        }else{
          Toast.fail(res.errmsg);
        }
      },
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

