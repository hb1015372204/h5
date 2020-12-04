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
                { vmid: 'description', name: 'description', content: '广州车展' }
            ]
        },
        created() {
            let script = document.createElement('script');
            let appid = process.env.NODE_ENV === 'development'?'675A1C89E7E34A3F92B4333AD4F340A8':'EACB86BD28594590866016F7AB010010';
            script.type = 'text/javascript'
            script.src = `http://sdk.talkingdata.com/app/h5/v1?appid=${appid}`
            document.getElementsByTagName('head')[0].appendChild(script)
        }
    }
</script>

<style lang="scss" scoped>
#app{
  background-color: #111441;
}
</style>
