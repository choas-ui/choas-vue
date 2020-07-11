<template>
    <ul class="cascade-item-wrap">
        <li>
            <div @click="($event)=>{setValue(itemData)}">
                <span>
                    {{itemData[reflectKey['key']]}}
                </span>
                <CIcon v-if="(itemData.children || []).length"
                      icon-name="choas-arrow-right"
                      style="position:absolute;right: 5px"
                />
            </div>
            <template  v-if="itemData.isOpen">
                <CCascadeItem v-for="(item, index) in itemData.children"
                             :key="index"
                             :item-data="item"
                             :style="{
                                     position: 'absolute',
                                     top:30*index + 'px',
                                     left: 150+'px'
                                 }"
                             :selected-items="selectedItems"
                             :conditionProps="conditionProps"
                             :reflect-key="reflectKey"
                             @change="change"
                />
            </template>

        </li>
    </ul>
</template>

<script>
    export default {
        name: 'CCascadeItem',
        props:{
            itemData:{
                type: Object,
                default(){
                    return {}
                }
            },
            lv:{

            },
            selectedItems:{},
            reflectKey:{
                type: Object,
                default(){
                    return {
                        timer: null,
                        key: 'title',
                        value: 'value'
                    }
                }
            },
            level:{
                type:String,
                default(){
                    return '0'
                }
            },
            conditionProps:{
                type:String,
                default(){
                    return 'node'
                }
            }
        },
        data(){
          return{
              color: '#000'
          }
        },
        methods:{
            setValue(item){
                // 本身出发事件
                this.$emit('change', item)
            },
            change(item){
                // 递归出发事件
                this.$emit('change', item)
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";
    .cascade-item-wrap{
        position: relative;
        //box-sizing: border-box;
        //top: addPX($sm-height);
        //left: addPX($sm-height);
        max-height: 300px;
        margin: 0;
        padding: 0;
        width: 150px;
        z-index: 999;
        background: #fff;
        text-align: left;
        &>li{
            list-style: none;
            height: addPX($sm-height);
            line-height: addPX($sm-height);
            cursor: pointer;
            box-sizing: border-box;
            padding: 0 addPX($df-padding);
            display: flex;
            font-size: addPX($lg-fs);
            border-radius: addPX($sm-radius);
            box-shadow: 1px 1px 4px $maskBg;
            &:hover{
                background: $info;
            }
            &:not(:last-of-type){
                border-bottom: 1px solid $lineColor;
            }
            >div{
                display: flex;
                align-items: center;
                width: 100%;
                text-align: left;
                >span{
                    width: 100%;
                    text-align: center;
                    word-break: break-all;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    .active{
                        background: $info;
                        color: #fff;
                    }
                }
            }

        }
    }
</style>
