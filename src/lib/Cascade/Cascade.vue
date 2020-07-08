<template>
    <div class="cascade-wrap">
        <input type="text"><input type="text"><input type="text">
    </div>
</template>

<script>
    import classNames from 'classnames'
    export default {
        name: 'Cascade',
        props:{
        },
        data() {
            return {
            };
        },
        computed:{
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    @import '../scss/variable';
    @import '../scss/size';
    @import '../scss/functions';
    input{
        width: 120px;
        border: 1px solid $lineColor;
        height: addPX($sxx-height);
        padding-left: addPX($sm-padding);
        &:focus {
            outline: none;
            border: 1px solid $primary;
        }
        margin-right: addPX($sm-padding);
    }
</style>
