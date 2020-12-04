<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
    export default {
        metaInfo: {
            title: '广州车展',
            meta: [
                { vmid: 'description', name: 'description', content: '---修改活动描述！！！' }
            ]
        },
    }
</script>

<style lang="scss" scoped>
#app{
  background-color: #111441;
}
</style>
