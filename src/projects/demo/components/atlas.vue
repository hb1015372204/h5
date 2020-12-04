<template>
    <div class="atlas">
        <div class="box-hd mt45 tcenter">
        <img :src="`${IMGURL}/test-gzcarshow/16058401892902.png`" class="btn-img btn-jctj"/>
        </div>
        <ul class="box-imgs mt15">
            <li v-for="(item,index) in contentList.children" :key="index" @click="HandleclickImg(item.children, index)" class="box-border">
                <div class="box-item">
                    <div class="cover" :style="`background-image: url(${item.img})`"></div>
                    <div class="title textRowTwo">{{item.title}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { ImagePreview } from "vant";
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
        HandleclickImg(childImgs,index) {
            this.images = [];
            childImgs.forEach(item => {
                this.images.push(item.img);
            });
            ImagePreview({
                images: this.images,
                startPosition: 0,
                closeable: true,
            });
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
$w: 230px;
$h: 220px;;
.box-imgs{
    display: flex;
    overflow-x: scroll;
    li{
        width: $w;
        height: $h;
        &::after{
            width: $w;
            height: $h;
        }
        .box-item{
            width: $w;
            height: $h;
        }
        .cover{
            width: 100%;
            height: 165px;
            background-size: cover;
            background-position: center;
        }
        .title{
            color: #fff;
            font-size: 14px;
            width: 100%;
            height: 55px;
            line-height: 22px;
            padding: 8px 6px;
            background-color: #1E55DC;
            box-sizing: border-box;
            font-family: PingFangSC;
        }
    }
    li:last-child{
        width: $w + 25;
    }
}
</style>