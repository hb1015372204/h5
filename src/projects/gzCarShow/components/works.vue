<template>
    <div class="works">
        <div class="box-hd mt45 tcenter" v-if="types == 'yzzp'">
            <img :src="`${IMGURL}/test-gzcarshow/16058400747831.png`" class="btn-img btn-yzzp"/>
        </div>
        <div class="more" @click="handleMore('more')">查看全部</div>
        <ul class="box-imgs">
            <li v-for="(item,index) in dataLists" :key="index"  @click="handleMore('detail', item.threadBasic)">
                <div class="box-item">
                    <div class="cover" :style="`background-image: url(${item.threadBasic.picture})`"></div>
                    <div class="title textRowTwo">{{item.threadBasic.title}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { ImagePreview } from "vant";
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
        handleMore(type, item) {
            let EventId, MapKv;
            let types = this.types;
            switch(type) {
                case 'more':
                    if(types=='zxjj'){
                        EventId = '资讯聚焦查看全部';
                        MapKv = {'资讯聚焦-查看全部':'资讯聚焦查看全部点击事件'};
                    }else{
                        EventId = '优质作品查看全部';
                        MapKv = {'优质作品-查看全部':'优质作品查看全部点击事件'};
                    }
                    jsApp.isMore('haval','home/informationDetail?thematicId=' + this.moreId);
                    break;
                case 'detail':
                    if(types=='zxjj'){
                        EventId = `资讯聚焦-${item.title}`;
                        MapKv = {'资讯聚焦-查看详情':'资讯聚焦查看详情点击事件'};
                    }else{
                        EventId = `优质作品-${item.title}`;
                        MapKv = {'优质作品-查看详情':'优质作品查看详情点击事件'};
                    }
                    jsApp.isMore('haval','community/postDetail?id=' + item.id);
                    break;
            }
            TDAPP.onEvent (EventId, '', MapKv);
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
        padding-right: 30px;
        font-family: PingFangSC;
        font-size: 16px;
        line-height: 32px;
        background-image: url(https://imgamp.gwm.com.cn/web/img/activity/bj-car-exhibition/more.png);
        background-position: right;
        background-repeat: no-repeat;
        background-size: 18px;
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
            height: 60px;
            line-height: 20px;
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