<template>
    <ul class="cascade-item-wrap">
        <li v-for="(item,index) of listData"
            :key="index"
        >
            <div @click="($event)=>{setValue(level+'-'+index, item)}">
                    <span>
                        {{item[reflectKey['key']]}}
                    </span>
                <Icon style="position:absolute;right: 5px" v-if="item.children" type="svg" icon-name="choas-arrow-right" />
            </div>
            <CascadeItem v-if="item.isOpen && item.children"
                         :list-data="item.children || []"
                         :style="{
                                 position: 'absolute',
                                 top: 30*index + 'px',
                                 left: 150+'px'
                             }"
                         :selected-items="selectedItems"
                         :reflect-key="reflectKey"
                         :level="level+'-'+index"
                         :lv="lv+1"
                         @change="change"
            />
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'CascadeItem',
        props:{
            listData:{
                type: Array,
                default(){
                    return []
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
            }
        },
        data(){
          return{
              color: '#000'
          }
        },
        methods:{
            setValue(newValue, item){
                // 本身出发事件
                this.$emit('change', newValue, item)
            },
            change(newValue, item){
                // 递归出发事件
                this.$emit('change', newValue, item)
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
        position: absolute;
        box-sizing: border-box;
        top: addPX($sm-height);
        left: addPX($sm-height);
        max-height: 300px;
        margin: 0;
        width: 150px;
        z-index: 999;
        background: #fff;
        padding: addPX($sm-padding) 0;
        text-align: left;
        border-radius: addPX($sm-radius);
        box-shadow: 1px 1px 4px $maskBg;
        >li{
            list-style: none;
            height: addPX($sm-height);
            line-height: addPX($sm-height);
            cursor: pointer;
            box-sizing: border-box;
            padding: 0 addPX($df-padding);
            display: flex;
            font-weight: bold;
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
