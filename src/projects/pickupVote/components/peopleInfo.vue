<template>
    <ul class="box-radio-list">
        <img :src="`${IMGURL}/test-gzcarshow/16064486605314.png`" />
        <div class="box-list" >
            <li v-for="(item,index) in userVoteInfo.voteList" :key="index" @click="handlePeople(item)">
                <span class="btn-circle" :class="isactive==item.voteId?'btn-circle-solid':''"></span>
                <span class="title textRowOne">{{item.nick}}</span>
            </li>
        </div>
    </ul>
</template>

<script>
export default {
    props: ['userVoteInfo', 'voteResultList'],
    data() {
        return {
            IMGURL: process.env.VUE_APP_BASE_IMGURL,
            isactive: -1,
        }
    },
    mounted() {
    },
    methods: {
        handlePeople(val) {
            this.isactive = val.voteId;
            this.$emit('funVote', val.voteId)
        }
    }
}
</script>

<style lang="scss" scoped>
.box-radio-list{
    width: calc(100% - 60px);
    height: 59%;
    background-color: rgba(103, 37, 0, 0.7);
    margin: 0 29px 0 29px;
    position:absolute;
    bottom: 98px;
    img{
        width: 100%;
        position: absolute;
        top: -5px;
    }
}
.box-list{
    position: absolute;
    left: 50%;
    top: 50.5%;
    transform: translate(-50%,-50.5%);
    width: 60%;
    max-height: 83%;
    overflow-y: auto;
    li{
        display: flex;
        height: 38px;
        line-height: 38px;
        span{
            display: inline-block;
        }
        .title{
            line-height: 100%;
            font-size: 18px;
            font-family: Source Han Sans CN;
            padding-left: 24px;
            color: #fff;
        }
    }
}
.box-results{
    width: 80%;
    li{
        justify-content: space-between;
        .title{padding-left: 0;}
    }
}
.btn-circle{
    display: inline-block;
    width: 14px;
    min-width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid #FFBF80;
    position: relative;
}
.btn-circle-solid{
    &::after{
        content: '';
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 10px;
        height: 10px;
        background-color: #FFBF80;
    }
}
</style>