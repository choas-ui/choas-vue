<template>
    <span>
        <template v-if="isUseNative">
            <label v-for="item of listData" :key="item" :class="getRadioItemClass">
                <input v-model="copySelectedData"
                       type="radio"
                       :value="item">
                {{item}}
            </label>
        </template>
        <template v-else>
            CRadio
        </template>
    </span>
</template>

<script>
    import classNames from 'classnames'
    import _ from "lodash"
    export default {
        name: 'CRadioGroup',
        props:{
            selectData:{
                type: Array,
                default(){
                    return []
                }
            },
            listData:{
              type: Array,
              default(){
                  return []
              }
            },
            isUseNative: {
                type: Boolean
            }
        },
        data() {
            return {
                copySelectedData: []
            };
        },
        computed:{
            getRadioItemClass(){
                const prefix =  this.prefix? this.prefix + '-': ''
                return classNames(
                    {
                        [`${prefix}radio-item`]: true
                    }
                )
            },
            xClass(){
                const prefix =  this.prefix? this.prefix + '-': ''
                return classNames(
                )
            },
        },
        methods: {
        },
        watch: {
            selectData: {
                handler(v){
                    if(!_.isEqual(v, this.copySelectedData)){
                        this.$set(this, 'copySelectedData', v)
                    }
                },
                deep: true,
                immediate: true
            },
            copySelectedData: {
                handler(v){
                    if(!_.isEqual(v, this.selectData)){
                        this.$set(this, 'input', v)
                    }
                },
                deep: true,
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";
    .radio-item{
        &>input{
            vertical-align: middle;
        }
    }
</style>
