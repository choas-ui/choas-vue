<template>
    <span class="checkbox-wrap">
        <label v-for="item in listData"
               :key="item[reflectKey['value']]"
               :hidden="!useNative"
        >
            <input type="checkbox" :value="item[reflectKey['value']]" v-model="checkboxValue">
            {{ item[reflectKey['key']] }}
        </label>
        <span v-if="!useNative">
            <span class="checkbox-item"
                  :style="{
                    width: width +'px',
                    height: height +'px',
                    lineHeight: height +'px',
                    cursor: 'pointer'
                  }"
            >
                <CIcon icon-name="choas-selected"
                       color="#006ab3"
                       :width="`${width/1 + 8}`"
                       :height="`${height/1 + 8}`"
                       :style="{
                        position: 'absolute',
                        top: `-${8/2}px`,
                        left: `-${8/2}px`,
                       }"
                />
            </span>
        </span>
    </span>
</template>

<script>
    import classNames from 'classnames'
    export default {
        name: 'CCheckbox',
        props:{
            value: {
                type: Array,
                default(){
                    return []
                }
            },
            listData: {
                type: Array,
                default(){
                    return []
                }
            },
            reflectKey:{
                type: Object,
                default(){
                    return {
                        key: 'key',
                        value: 'value'
                    }
                }
            },
            useNative:{
                type: Boolean
            },
            width:{
                type: String,
                default(){
                    return '18'
                }
            },
            height:{
                type: String,
                default(){
                    return '18'
                }
            }
        },
        data() {
            return {
                checkboxValue: []
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
        },
        watch:{
            value:{
                handler(v){
                    this.checkboxValue = v
                },
                deep: true,
                immediate: true
            },
            checkboxValue:{
                handler(v){
                    console.log(v)
                    this.$emit('input', v)
                },
                deep: true
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";
    .checkbox-item{
        border: 1px solid $darkLineColor;
        border-radius: 2px;
        display: inline-block;
        position: relative;
        box-shadow: 0 0 10px $lineColor;
        &:hover{
            box-shadow: 0 0 10px $primary;
        }
    }
</style>
