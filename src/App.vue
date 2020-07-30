<template>
    <div>
<!--        <CPrompt dialog="燃烧你的卡路里" place-setting="top-left">123</CPrompt>-->
<!--        <CPrompt dialog="燃烧你的卡路里" place-setting="top-right">123</CPrompt>-->
<!--        <CPrompt dialog="燃烧你的卡路里" place-setting="top-center">123</CPrompt>-->
        <CPrompt dialog="燃烧你的卡路里" place-setting="bottom-left" :render-component="(h)=>h('div',[123])">123</CPrompt>
<!--        <CPrompt dialog="燃烧你的卡路里" place-setting="bottom-right">123</CPrompt>-->
<!--        <CPrompt dialog="燃烧你的卡路里" place-setting="bottom-center">123</CPrompt>-->
    </div>
</template>

<script>
    export default {
        name: 'App',
    }
</script>

<style lang="scss">
    body {
        margin: 0;
        overflow: hidden;
        height: 100vh;
        width: 100vh;
        &>div{
            position: absolute;
            bottom: 0;
            right: 0;
        }
    }
</style>
