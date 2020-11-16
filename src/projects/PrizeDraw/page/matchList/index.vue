<template>
    <div class="container">
        <van-tabs type="card" sticky color="#ccc">
            <van-tab title="最新发布">
                <New />
            </van-tab>
            <van-tab title="投票排行">
                <Ticket />
            </van-tab>
        </van-tabs>
        <!-- <ul class="tabs">
            <li v-for="(item, index) in list" :key="index">{{item.name}}</li>
        </ul>
        <div class="tabs-con"></div> -->

        <div class="box-lucky" @click="$router.push({ path: '/luck'})">抽奖专区</div>
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
            active: 'new',
            list: [
                {id: 'new', name:'最新发布'},
                {id: 'ticket', name:'投票排行'}
            ]
        }
    },
    mounted() {

    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.box-lucky{
    position: fixed;
    right: 0;
    bottom: 15%;
}
</style>