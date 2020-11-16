<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: "prizeDraw",
    metaInfo: {
        title: '车友会征集会徽',
        meta: [
          { vmid: 'description', name: 'description', content: 'prizeDraw是描述！！！' }
        ]
    },
}
</script>

<style lang="scss" scoped>
#app{
    height: 100%;
}
</style>