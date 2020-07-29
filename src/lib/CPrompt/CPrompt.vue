<template>
    <span :class="getPromptWrap" @click="showPrompt">
        <slot></slot>
    </span>
</template>

<script>
    import classNames from 'classnames'
    export default {
        name: 'CPrompt',
        props:{
            className: {
                type: String,
                default(){
                    return ''
                }
            },
            prefix: {
                type: String,
                default(){
                    return ''
                }
            }
        },
        data() {
            return {
                isPromptShow: false
            };
        },
        computed:{
            getPromptWrap(){
                const prefix =  this.prefix? this.prefix + '-': ''
                return classNames(
                    this.className,
                    {
                        [prefix + '']: true
                    }
                    )
            }
        },
        methods: {
            showPrompt(){

            },
            confirmHandle(){
                this.$emit('confirm')
            },
            cancelHandle(){
                this.$emit('cancel')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";

    .prompt-wrap{
        position: absolute;
    }
</style>
