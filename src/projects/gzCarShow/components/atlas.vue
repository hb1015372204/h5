<template>
    <div class="atlas">
        <div class="box-hd mt45 tcenter">
        <img :src="`${IMGURL}/test-gzcarshow/16058401892902.png`" class="btn-img btn-jctj"/>
        </div>
        <ul class="box-imgs mt18">
            <li v-for="(item,index) in contentList.children" :key="index" @click="HandleclickImg(item, index)">
                <div class="cover" :style="`background-image: url(${item.img})`"></div>
                <div class="title textRowTwo">{{item.title}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
import { ImagePreview } from "vant";
import API from '@/api/appAPI';
import pdAPI from '@/api/webH5API';
import { Toast } from 'vant';
export default {
    props: ['types'],
    data() {
        return {
            IMGURL: process.env.VUE_APP_BASE_IMGURL,
            images: [],
            contentList: {}
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            let params;
            if (process.env.NODE_ENV === 'development') {// 开发
                params = {root: 4, id: 29, nodecode: 'imgListInfo'};
            }else{// 生产
                params = {root: 1, id: 31, nodecode: 'imgListInfo'};
            }
            const res = await pdAPI.getcontent(params);
            if(res.errcode == 0) {
                let data = res.object;
                this.contentList = data;
            }else{
                Toast.fail(res.errmsg);
            }
            
        },
        HandleclickImg(item,index) {
            this.images = [];
            let childImgs = item.children;
            childImgs.forEach(item => {
                this.images.push(item.img);
            });
            ImagePreview({
                images: this.images,
                startPosition: 0,
                closeable: true,
            });
            TDAPP.onEvent (`精彩图集-${item.title}`);
        },
    }
}
</script>

<style lang="scss" scoped>
.atlas{
    padding: 0 0 0 20px;
    .btn-img{
        width: 200px;
        margin: 0 auto;
    }
}
.box-imgs{
    display: flex;
    overflow-x: scroll;
    li{
        width: 244px;
        background-image: url(../../../images/hot_border.png);
        overflow: hidden;
        background-size: contain;
        background-repeat: no-repeat;
        padding: 8px;
        box-sizing: border-box;
        border-radius: 4px 4px 0px 0px;
        flex-shrink: 0;
        margin-right: 32px;
        .cover{
            width: 234px;
            height: 158px;
            border-radius: 4px 4px 0px 0px;
            background-image: linear-gradient(226deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.00) 100%);
            background-size: cover;
            background-position: center;
        }
        .title{
            color: #fff;
            font-size: 14px;
            width: 100%;
            height: 82px;
            line-height: 42px;
            padding: 20px 6px;
            box-sizing: border-box;
            font-family: PingFangSC;
        }
    }
    li:last-child{
        width: 270px;;
        height: 240px;
        .cover{
            width: 234px;
            height: 160px;
        }
    }
}
</style>