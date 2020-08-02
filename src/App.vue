<template>
    <div>
        <p>{{ value }}</p>
        <CInput v-model="value" placeholder="一些不知道的内容"/>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                value: ''
            }
        }
    }
</script>

<style lang="scss">
    body {
        margin: 0;
        overflow: hidden;
        height: 100vh;
        width: 100vw;
    }
</style>
