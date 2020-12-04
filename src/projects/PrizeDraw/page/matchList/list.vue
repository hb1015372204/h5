<template>
    <div class="container">
        <ul class="box-news">
            <li v-for="(item, index) in list" :key="index">
                <img :src="`${item.emblem.length>0?item.emblem[0]:''}`"/>
                <p class="tcenter">{{item.club}}</p>
                <div class="op">
                    <span @click="handleLike(item)">♥</span>
                    <span>{{item.likeNum}}</span>
                </div>
            </li>
        </ul>
        <van-dialog v-model="show" :showConfirmButton="false" class="dialog-cont-tips">
            <p>恭喜您投票成功</p>
            <p>转发可获得1次抽奖机会</p>
            <van-button type="info" @click="handleForward">转发</van-button>
        </van-dialog>
    </div>
</template>

<script>
import { Toast } from 'vant';
import API from '@/api/webH5API'
export default {
    props: ['tabType'],
    data() {
        return {
            list: [],
            pages: {
                sort: 0,
                page: 1,
                pageSize: 20
            },
            show: false
        }
    },
    watch: {
        tabType: {
            handler(val) {
                this.pages.sort = val;
                this.getEmblemList();
    　　　　},  
    　　　　deep: true
        },
    },
    mounted() {
        this.getEmblemList();
    },
    methods: {
        // 获取参与用户列表
        async getEmblemList(){
            const res = await API.getEmblemList(this.pages);
            if(res.errcode == 0) {
                this.list = res.list.map(item=>{
                    item.emblem = item.emblem?item.emblem.split(';'):[];
                    return item;
                })
            }else{
                Toast.fail(res.errmsg);
            }
        },
        // 点赞
        async handleLike(val) {
            const res = await API.emblemLike({voteId: val.id});
            if(res.errcode == 0) {
                this.getEmblemList();
                this.show = true;
            }else{
                Toast.fail(res.errmsg);
            }
        },
        handleForward() {
            this.show = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.box-news{
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    li{
        width: calc(100% / 2 - 5px);
        img{
            width: 100%;
        }
    }
    li:nth-child(2n) {margin-left: 10px;}
    .op{
        display: flex;
        justify-content: space-around;
    }
    
}
</style>