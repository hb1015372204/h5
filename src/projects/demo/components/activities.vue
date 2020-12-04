<template>
    <div class="box-activity mt45">
        <div class="box-hd tcenter">
            <img v-if="this.types=='hdhd'" :src="`${IMGURL}/test-gzcarshow/16058399227106.png`" class="btn-img btn-hdhd"/>
            <img v-else :src="`${IMGURL}/test-gzcarshow/16058401562455.png`" class="btn-img btn-xcys"/>
        </div>
        <div class="mt15">
            <p class="tcenter" v-if="this.types=='hdhd'">{{contentList.remarks}}</p>
            <ul >
                <li v-for="(item, index) in contentList.children" :key="index" @click="handlDetails(item)" class=" box-border">
                    <img class="box-item" :src="item.img" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import API from '@/api/webH5API';
import { Toast } from 'vant';
import jsApp from '@/utils/jsApp'

export default {
    props: ['types'],
    data() {
        return {
            IMGURL: process.env.VUE_APP_BASE_IMGURL,
            lists: [],
            contentList: {}
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            let params;
            switch(this.types) {
                case 'hdhd': // 互动活动
                    if (process.env.NODE_ENV === 'development') {// 开发
                        params = {root: 4, id: 22, nodecode: 'activityList'};
                    }else{// 生产
                        params = {root: 1, id: 20, nodecode: 'activityList'};
                    }
                   break;
                case 'xcys': // 新车预售
                    if (process.env.NODE_ENV === 'development') {// 开发
                        params  = {root: 4, id: 26, nodecode: 'sellInfo'};
                    }else{// 生产
                        params = {root: 1, id: 26, nodecode: 'sellInfo'};
                    }
                   break;
            }
            const res = await API.getcontent(params);
            if(res.errcode == 0) {
                let data = res.object;
                this.contentList = data;
            }else{
                Toast.fail(res.errmsg);
            }
        },
        handlDetails(item) {
            if(item.content.indexOf("http") != -1 ){
                window.location.href = item.content;
            }else{
                jsApp.goApp(item.content);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$w: calc(100% - 5px);
$h: calc(92vw * 400 / 706);
.box-activity{
    padding: 0 20px;
    color: #fff;
    .btn-img{
        width: 200px;
        margin: 0 auto;
    }
    p{
        font-size: 14px;
        line-height: 20px;
        padding-bottom: 5px;
    }
    ul{
        li{
            width: $w;
            height: $h;            
            &::after{
                width: $w;
                height: $h;
            }
            img{
                width: calc(91vw - 130vw * 16 / 750);
                height: calc(90vw * 425 / 706 - 90vw * 15 / 750);
                border-radius: 5px;
            }
        }
        li+li{margin-top: 30px;}
    }
}
</style>