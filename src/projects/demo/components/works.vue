<template>
    <div class="works">
        <div class="box-hd mt45 tcenter" v-if="types == 'yzzp'">
            <img :src="`${IMGURL}/test-gzcarshow/16058400747831.png`" class="btn-img btn-yzzp"/>
        </div>
        <div class="more" @click="handleMore('more')">查看全部<i class="iconfont iconmore"></i></div>
        <ul class="box-imgs">
            <li v-for="(item,index) in dataLists" :key="index"  @click="handleMore('detail', item.threadBasic.id)" class="box-border">
                <div class="box-item">
                    <div class="cover" :style="`background-image: url(${item.threadBasic.picture})`"></div>
                    <div class="title textRowTwo">{{item.threadBasic.title}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import jsApp from '@/utils/jsApp'
import API from '@/api/appAPI';
import { Toast } from 'vant';
export default {
    props: ['types'],
    data() {
        return {
            IMGURL: process.env.VUE_APP_BASE_IMGURL,
            dataLists: [],
            num: 0,
            moreId: '',
            images: [],
        }
    },
    mounted() {
        this.getHotContentList();
    },
    methods: {
        // 获取图集信息
        async getHotContentList(){
            let params, nodeId;
            switch(this.types) {
                case 'zxjj': // 资讯聚集
                    nodeId = process.env.NODE_ENV === 'development'?'haval_serviceCH_kownsPG_subjectMDL':'haval_autoShowCH_infoPG_infoMDL';
                    params  = {nodeId: nodeId};
                   break;
                case 'yzzp': // 优质作品
                    nodeId = process.env.NODE_ENV === 'development'?'haval_serviceCH_userServicePG_subjectMDL':'haval_autoShowCH_hotPG_infoMDL';
                    params  = {nodeId: nodeId};
                   break;
            }
            let  headers = {brand: 1, enterPriseId: 'CC001', rs: 2, terminal: 'GW_APP_Haval'};
            const res = await API.getHotContentList(params, headers);
            if(res.code == '000000') {
                var thematic = res.data[0].children[0].contentMessageList[0].objList[0];
                this.num = thematic.subjectContentEffectiveNumber;
                this.moreId = thematic.id;
                this.queryPostsList(thematic)
            }else{
                Toast.fail(res.errmsg);
            }
        },
        async queryPostsList(thematic, ){
            let params = {
                "queryParam": {"subjectId": thematic.id},
                "sortParam": {
                    "order": "0",
                    "type": "0"
                },
                "pageParam": {
                    "pageSize": 10,
                    "pageNo": 1
                }
            };
            let  headers = {brand: 1, enterPriseId: 'CC001', rs: 2, terminal: 'GW_APP_Haval'};
            const res = await API.queryPostsList(params, headers);
            if(res.code == '000000') {
                let data = res.data.list;
                this.dataLists = data;
            }else{
                Toast.fail(res.errmsg);
            }
        },
        handleMore(type, detailId) {
            switch(type) {
                case 'more':
                    jsApp.isMore('haval','home/informationDetail?thematicId=' + this.moreId);
                    break;
                case 'detail':
                    jsApp.isMore('haval','community/postDetail?id=' + detailId);
                    break;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.works{
    padding: 0 0 0 20px;
    .btn-img{
        width: 200px;
        margin: 0 auto;
    }
    .more{
        margin: 8px 12px 8px 8px;
        color: #ffffff;
        text-align: right;
        font-family: PingFangSC;
        font-size: 16px;
        .iconfont{
            font-size: 22px;
            padding-left: 10px;
            padding-top: 20px;
        }
    }
}
$w: 230px;
$h: 220px;
.box-imgs{
    display: flex;
    overflow-x: scroll;
    padding: 5px;
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