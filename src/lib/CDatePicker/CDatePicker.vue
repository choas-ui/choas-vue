<template>
    <div>
        CDatePicker
    </div>
</template>

<script>
    import classNames from 'classnames'

    export default {
        name: 'CDatePicker',
        props:{
            log:{}
        },
        data() {
            return {};
        },
        mounted() {
        },
        computed: {
            xClass() {
                const prefix = this.prefix ? this.prefix + '-' : '';
                return classNames(
                )
            }
        },
        methods: {},
        watch: {
            log:{
                handler(v){
                    v && v()
                },
                deep: true,
                immediate: true
            },

        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/functions";
    @import "../scss/size";
    @import "../scss/normal-bg";
    @import "../scss/variable";
    @import "../scss/comm-class";
</style>
