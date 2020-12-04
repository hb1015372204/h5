<template>
    <div class="container">
        <!-- <van-tabs type="card" sticky color="#ccc">
            <van-tab title="最新发布">
                <New />
            </van-tab>
            <van-tab title="投票排行">
                <Ticket />
            </van-tab>
        </van-tabs> -->
        <ul class="tabs">
            <li v-for="(item, index) in list" :key="index" @click="currentTab=item.id">{{item.name}}</li>
        </ul>
        <div class="tabs-con" >
            <List :tabType="currentTab"/>
        </div>
        

        <div class="box-lucky" @click="$router.push({ path: '/luck'})">抽奖专区</div>
    </div>
</template>

<script>
import List from './list.vue'
export default {
    components: {
        List
    },
    data() {
        return {
            currentTab: 0,
            list: [
                {id: 0, name:'最新发布'},
                {id: 1, name:'投票排行'}
            ]
        }
    },
    computed: {
      currentComponent() {
        return this.currentTab
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