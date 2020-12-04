<template>
  <div class="container">
      <Home v-if="isAuth==1" :userVoteInfo="userVoteInfo" :appUserInfo="appUserInfo" :isVotes="isVotes"/>
      <NoAuth v-if="isAuth&&isAuth!=1" />
  </div>
</template>

<script>
import { Toast } from 'vant';
import Home from './home';
import NoAuth from './noAuth';
import jse from '@/utils/jsencrypt';
import jsApp from '@/utils/jsApp'
import API from '@/api/webH5API';
export default {
  components:{
    Home, NoAuth
  },
  data() {
    return {
      isAuth: '',
      isVotes: -1,
      appUserInfo: {},// app用户信息
      userVoteInfo: {}
    }
  },
  mounted() {
    this.init();
  },
  methods: {
      async init() {
        this.appUserInfo = jsApp.getAppUserInfo();
        if(!this.appUserInfo||!this.appUserInfo.accessToken){this.isAuth = -1;jsApp.openLogin();return}
        let params = {"phone": this.appUserInfo.phone};
        const res = await API.getpickupVoteList({data: jse.encrypt(JSON.stringify(params))});
        if(res.errcode == 0) {
          let object = res.object;
          this.isAuth = object.canVote==0?-1:object.canVote;
          this.isVotes = object.isVote;
          this.userVoteInfo = object;
          document.body.style.backgroundColor = '#000'
        }else{
          this.isAuth = -1;
          Toast.fail(res.errmsg);
        }
      }
  }
    
}
</script>

<style lang="scss" scoped>
.container{
  // background-color: #000;
}
</style>