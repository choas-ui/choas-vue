<template>
    <div :class="getSelectWrapClass">
        <label>
            <input type="text"
                   placeholder="请选择"
                   ref="input"
                   @focus="isDropUlShow = true"
                   :value="getSelectedTitle"
            />
            <Icon type="svg"
                  icon-name="choas-arrow-down"
                  :style="{
                       position: 'absolute',
                       right: '10px',
                       top: '5px',
                       transform: isDropUlShow? 'rotate(180deg)': 'rotate(0)',
                       transition: 'all 0.3s'
                  }"
                  @click="iconClick($event)"
            />
        </label>
        <div v-if="isDropUlShow" class="collapse-box" style="width: 610px">
            <CascadeItem :list-data="copyData" :reflect-key="reflectKey" @change="change" :lv="0" />
        </div>
    </div>
</template>

<script>
    import classNames from 'classnames'
    import _ from 'lodash'
    import CascadeItem from "./CascadeItem";
    export default {
        name: 'Cascade',
        comments:{
            CascadeItem
        },
        props:{
            listData:{
                type: Object,
                default(){
                    return {}
                }
            },
            value:{
                type: Array,
                default(){
                    return []
                }
            },
            reflectKey:{
                type: Object,
                default(){
                    return {
                        timer: null,
                        key: 'title',
                        value: 'value'
                    }
                }
            }
        },
        data() {
            return {
                isDropUlShow: false,
                copyData: []
            };
        },
        mounted() {
            this.copyData = [_.clone(this.listData)]
        },
        computed:{
            getSelectWrapClass(){
                const prefix =  this.prefix? this.prefix + '-': ''
                return classNames(
                    {
                        [prefix+ 'cascade-wrap']: true
                    }
                )
            },
            getSelectedValue(){
                return _.get(this.value,'0.'+[this.reflectKey['value']], '')
            },
            getSelectedTitle(){
                return _.get(this.value,'0.'+[this.reflectKey['key']], '')
            }
        },
        updated() {
            const oUl = this.$refs.dropUl
            if(oUl){
                // 出现位置判断
                // console.dir(this.$refs.dropUl)
                // console.dir(this.$refs.dropUl.getBoundingClientRect())
            }
        },
        methods: {
            iconClick(e){
                e.preventDefault()
                this.isDropUlShow = !this.isDropUlShow
            },
            change(newValue){
                const path = newValue.slice(2).split('-').join('.children.').split('.')
                const reversePath = [...path].reverse()
                // 获取自身序号
                const [firstPath, ...parentPathReverse] = reversePath
                // 获取父元素路径
                const parentPath = [...parentPathReverse].reverse().join('.')
                // 获取父元素值
                const parentValue =parentPath!==''? _.get(this.copyData, parentPath,{}): this.copyData
                // 获取自身值
                const selfValue =  _.get(this.copyData, path,{})
                // 获取自身序数
                const selfIndex = parseInt(firstPath, 10)
                // 关闭所有同级
                parentValue.forEach((item,index)=>{
                    if(index !== selfIndex){
                        parentValue.splice(index,1,{...item, isOpen: false})
                    }
                })
                // 打开自身
                parentValue.splice(selfIndex,1,{...selfValue, isOpen: !selfValue.isOpen})
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";
    .cascade-wrap{
        display: flex;
        height: addPX($sm-height);
        position: relative;
        width: 100%;
        background: #fff;
        >label{
            display: block;
            flex: 1;
            > input {
                height: 100%;
                width: 100%;
                box-sizing: border-box;
                border: 1px solid $lineColor;
                border-radius:  addPX($sm-radius);
                &:focus {
                    outline: none;
                    border: 1px solid $primary;
                }
            }
        }
        .collapse-box{
            position: absolute;
            width: 100%;
            min-height: 200px;
            background: #fff;
            border: 1px solid #ccc;
            top: addPX($df-height);
            box-shadow: 1px 1px 3px $shadowCr;
            border-radius: addPX($sm-radius);
            z-index: 999;
        }
    }
</style>
