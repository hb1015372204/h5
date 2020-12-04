<template>
  <div class="container">
    <img :src="`${IMGURL}/test-gzcarshow/16064486768291.jpg`" class="bg-img"/>
    <img :src="logoTtile" class="logo"/>
    <!-- 参与 人员列表 -->
    <PeopleInfo @funVote="funVote"  v-if="isVotes==0&&!voteYS" :userVoteInfo="userVoteInfo"/>
    <VoteResult v-else :voteResultList="isVotes!=0?userVoteInfo.voteResult:voteResultList"/>
    <div class="box-btn" v-if="isVotes==0&&!voteYS">
      <img @click="handleVote" :src="`${IMGURL}/test-gzcarshow/16064485783149.png`"/>
    </div>

    <div class="rule" @click="handleRule"><!-- 活动规则 --></div>
    
    <van-overlay :show="show" @click="show = false">
      <div class="box-rules">
        <div class="block">
          <img :src="`${IMGURL}/test-gzcarshow/16064486061560.png`" />
          <p>1、投票仅限各省大队内部车友，且每人仅限投票一次，非车友会成员无法进行投票</p>
          <p>2、官方基于报名人员名单，在各省队投票，票数最高者当选，由官方进行标识认证</p>
          <div class="iconfont iconclosed"  @click="show = false"></div>
        </div>
      </div>
    </van-overlay>

  </div>
</template>

<script>
import { Toast } from 'vant';
import PeopleInfo from '../components/peopleInfo';
import VoteResult from '../components/voteResult';
import API from '@/api/webH5API';
import jse from '@/utils/jsencrypt';
export default {
  components:{
    PeopleInfo,VoteResult
  },
  props: ['isVotes','userVoteInfo','appUserInfo'],
  data() {
    return {
      IMGURL: process.env.VUE_APP_BASE_IMGURL,
      show: false,
      voteYS: false,
      logoTtile: '',
      voteId: '',
      voteResultList: []
    }
  },
  mounted() {
    this.getcontentInfo();
  },
  methods: {
    async getcontentInfo() {
      let params = {root: process.env.NODE_ENV === 'development'? 36: '',nodecode: this.userVoteInfo.clubCode}; 
      const res = await API.getcontent(params);
      if(res.errcode == 0) {
        let data = res.object;
        this.logoTtile = data.img;
      }else{
        Toast.fail(res.errmsg);
      }
    },
    handleRule() {
      this.show = true;
    },
    // 选定的投票项
    funVote(val) {
      this.voteId = val;
    },
    async handleVote() {
      if(!this.voteId){
        Toast('请选择要投票的人');
        return;
      }
      if(this.userVoteInfo.isVote!=0){
        Toast('您已投票');
        return;
      }
      let params = {
        "phone": this.appUserInfo.phone,
        "suserId": this.appUserInfo.ssoId,
        "voteId": this.voteId
      }
      // let params = {
      //   "phone": '15971207133',
      //   "suserId": 'U779323273421926400',
      //   "voteId": this.voteId
      // }
      const res = await API.votefor({data: jse.encrypt(JSON.stringify(params))});
      if(res.errcode == 0) {
        this.voteYS = true;
        this.voteResultList = res.list;
      }else{
        Toast.fail(res.errmsg);
      }
    }
  }
    
}
</script>

<style lang="scss" scoped>
.container{
  position: relative;
  background-color: #000;
  .logo{
    width: 180px;
    position: absolute;
    left: 50%;
    top: 42px;
    transform: translate(-50%);
  }
  .box-btn{
    width: 100%;
    position:absolute;
    bottom: 45px;
    text-align: center;
    img{
      width: 145px;
    }
  }
  .rule{
    position: absolute;
    right: 10px;
    top: 12px;
    width: 62px;
    height: 14px;
  }
}
.box-rules{
  height: 100%;
  position: relative;
  .block{
    width: 65%;
    padding: 10px 28px 20px;
    color: #fff;
    line-height: 16px;
    background-color: rgba(143, 51, 0, 0.85);
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    position: relative;
    P{text-align: left;}
    p+p{padding-top: 10px;}
    img{
      width: 84px;
      padding-bottom: 8px;
    }
    .iconfont{
      position: absolute;
      left: 0;
      right: 0;
      bottom: -28px;
      font-size: 28px;
    }
  }
}
</style>

