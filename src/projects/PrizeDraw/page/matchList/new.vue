<template>
    <div class="container">
        <ul class="box-news">
            <li v-for="(item, index) in list" :key="index">
                <img src="../../assets/timg.jpg"/>
                <p class="tcenter">{{item.name}}</p>
                <div class="op">
                    <span @click="handleLike(item)">♥</span>
                    <span>{{item.num}}</span>
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
import New from './new.vue'
import Ticket from './ticket.vue'
export default {
    components: {
        New, Ticket
    },
    data() {
        return {
            list: [
                {id: 1, pic:'', name:'用户昵称', num: 100},
                {id: 2, pic:'', name:'用户昵称', num: 100},
                {id: 3, pic:'', name:'用户昵称', num: 100},
                {id: 4, pic:'', name:'用户昵称', num: 100},
                {id: 5, pic:'', name:'用户昵称', num: 100},
            ],
            show: false
        }
    },
    mounted() {

    },
    methods: {
        handleLike(val) {
            this.show = true;
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