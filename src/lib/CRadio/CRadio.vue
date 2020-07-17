<template>
    <div>
        CRadio
    </div>
</template>

<script>
    import classNames from 'classnames'
    export default {
        name: 'CRadio',
        props:{
        },
        data() {
            return {
            };
        },
        computed:{
            xClass(){
                const prefix =  this.prefix? this.prefix + '-': ''
                return classNames(
                )
            }
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";
</style>
