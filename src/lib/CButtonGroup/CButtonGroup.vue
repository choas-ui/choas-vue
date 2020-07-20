<template>
    <span :class="getWrapClass">
        <template v-if="isDataModel">
            <CButton v-for="(item,index) of listData"
                     :key="item[reflectKey['value']]"
                     ref="btn"
                     :type="item.type"
                     :size="item.size"
                     :class="{
                         [`first-item`]: !index,
                         [`last-item`]: index === listData.length - 1
                     }"
                     :style="checkedArr.findIndex(v => v[reflectKey['value']]===item[reflectKey['value']])>-1? activeStyle: normalStyle"
                     @click="($event) =>setClickKey(item, $event)"
            >
                {{ item[reflectKey['key']] }}
            </CButton>
        </template>
        <slot v-else></slot>
    </span>
</template>

<script>
    import classNames from 'classnames'
    import _ from 'lodash'
    export default {
        name: 'CButtonGroup',
        props:{
            checkedData: {
                type: Array,
                default() {
                    return []
                }
            },
            listData: {
                type: Array,
                default(){
                    return []
                }
            },
            normalStyle:{
              type: Object,
              default(){
                  return {}
              }
            },
            activeStyle:{
                type: Object,
                default(){
                    return {}
                }
            },
            multiple:{
                type: Boolean
            },
            halfChecked:{
                type: Boolean
            },
            placeholder: {
                type: String,
                default(){
                    return ''
                }
            },
            reflectKey: {
              type: Object,
              default(){
                  return {
                      key: 'key',
                      value: 'value',
                  }
              }
            },
            prefix: {
                type: String,
                default(){
                    return ''
                }
            },
            className: {
                type: String,
                default(){
                    return ''
                }
            }
        },
        data() {
            return {
                // 需要在左右加两个半圆
                isDataModel: true,
                copyValue: [],
                checkedArr: []
            };
        },
        model: {
            prop: 'checkedData',
            event: 'checkedDataChange'
        },
        mounted(){
            this.$set(this, 'copyValue', _.cloneDeep(this.checkedData))
            if(Object.keys(this.$slots).length){
                this.isDataModel = false
            }
            if(this.isDataModel){
                for(let i =0 ; i< this.copyValue.length;i++){
                    const index = this.checkedArr.findIndex(v => v[this.reflectKey['value']] === this.copyValue[i][this.reflectKey['value']])
                    if(index>-1){
                        if(!this.copyValue[i].checked){
                            this.copyValue[i].checked = false
                            this.checkedArr.splice(index,1)
                        }
                    }
                    if(index<0){
                        if(this.copyValue[i].checked){
                            this.copyValue[i].checked = true
                            this.checkedArr.push(this.copyValue[i])
                        }
                    }
                }
            }
        },
        computed:{
            getWrapClass(){
                const prefix =  this.prefix? this.prefix + '-': ''
                return classNames(
                    {
                        [`${prefix}btn-group-wrap`]: true
                    }
                )
            }
        },
        methods: {
            setClickKey(item, e){
                let index = this.checkedArr.findIndex(v => v[this.reflectKey['value']] === item[this.reflectKey['value']])
                if (index > -1) {
                    if (this.multiple) {
                        this.$set(item, 'checked', false)
                    }
                    this.checkedArr.splice(index, 1)
                }
                if (index < 0) {
                    if (this.multiple) {
                        this.$set(item, 'checked', true)
                        if(this.halfChecked){
                            this.$set(item, 'halfChecked', true)
                        }
                        this.checkedArr.push(item)
                    }else{
                        this.$set(this, 'checkedArr', [item])
                    }
                }
                this.$emit('click', item[this.reflectKey['value']], item, e)
            }
        },
        watch: {
            checkedData: {
                handler(v, old) {
                    if(!_.isEqual(v, old)){
                        this.$set(this, 'checkedArr', v)
                    }
                },
                deep: true,
                immediate: true
            },
            checkedArr: {
                handler(v, old) {
                    if(!_.isEqual(v, old)){
                        this.$emit('checkedDataChange', v)
                    }
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";
    .btn-group-wrap{
        button{
            border-radius: 0;
        }
    }
</style>
