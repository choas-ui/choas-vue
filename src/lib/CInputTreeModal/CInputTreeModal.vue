<template>
    <span>
        <template v-if="!canBeEdited">
          <div class="input-like input-like-unedited" >
            <template v-if="selectedData.length">
              <span
                      v-for="(item, index) of selectedData"
                      :key="index + item[reflectKey['value']]"
                      :class="multiple+1 ? 'tag-span' : 'content-span'"
              >
                {{ item[[reflectKey['key']]] }}
              </span>
            </template>
          </div>
        </template>
        <template v-else>
          <div class="input-like-wrap">
              <div class="input-like"
                   @click="inputClick"
                   :style="{
                       width: buttonTxt?'70%': '100%',
                   }">
                  <template v-if="selectedData.length">
                      <span
                              v-for="(item, index) of selectedData"
                              :key="index + item[reflectKey['value']]"
                              :class="multiple+1 ? 'tag-span' : 'content-span'"
                      >
                          {{ item[[reflectKey['key']]] }}
                      </span>
                  </template>
                  <template v-else>
                      <span class="placeholder-span">{{ placeholder }}</span>
                  </template>
              </div>
              <CButton v-if="buttonTxt" @click="isModalShow = !isModalShow" size="large">{{buttonTxt}}</CButton>
          </div>
        </template>
        <CTreeModal :list-data="listData"
                    v-model="selectedData"
                    :width="width"
                    :height="height"
                    :mask="mask"
                    :line="line"
                    :draggable="draggable"
                    :controllerColor="controllerColor"
                    :activeColor="activeColor"
                    :reflectKey="reflectKey"
                    :conditionProps="conditionProps"
                    :title="title"
                    :isShow="isModalShow"
                    :placeholder="placeholder"
                    @toggleShow="v => this.isModalShow= v"
                    @addTreeNode="addTreeNode"
        ></CTreeModal>
    </span>
</template>
<script>
    export default {
        name: 'CInputTreeModal',
        props: {
            conditionProps:{
                type:String,
                default(){
                    return 'node'
                }
            },
            width: {
                type: String,
                default() {
                    return '800'
                }
            },
            height: {
                type: String,
                default() {
                    return '600'
                }
            },
            mask: {
                type: Boolean
            },
            line: {
                type: Boolean
            },
            canBeEdited: {
                type: Boolean
            },
            draggable: {
                type: Boolean
            },
            controllerColor: {
                type: String,
                default() {
                    return '#fff'
                }
            },
            activeColor: {
                type: String,
                default() {
                    return '#fff'
                }
            },
            multiple: {
                type: Boolean
            },
            buttonTxt: {
                type: String,
                default() {
                    return ''
                }
            },
            reflectKey: {
                type: Object,
                default() {
                    return {
                        key: 'title',
                        value: 'value'
                    }
                }
            },
            placeholder: {
                type: String,
                default() {
                    return ''
                }
            },
            title: {
                type: String,
                default() {
                    return ''
                }
            },
            listData: {
                type: Array,
                required: true,
                default() {
                    return []
                }
            },
            value: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                isModalShow: false,
                selectedData: this.value,
            }
        },
        mounted(){
            this.selectedData=this.value
        },
        methods:{
            inputClick(){
                if(!this.buttonTxt){
                    this.isModalShow = true
                }
            },
            addTreeNode(v){
                this.$emit('addTreeNode', v)
            }
        },
        watch: {
            selectedData:{
                handler(v){
                    this.$emit('input', v)
                },
                deep: true,
                immediate: true
            },
            value:{
                handler(v){
                    this.selectedData =  v
                },
                deep: true,
                immediate: true
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";

    .input-like-wrap{
        display: flex;
        align-items: center;
        justify-content: center;
        .input-like {
            width: 100%;
            border: 1px solid #D9D9D9;
            border-radius: 4px;
            line-height: 34px;
            min-height: 34px;
            padding-left: 10px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;
            cursor: pointer;
            &-unedited{
                border: none;
                cursor: not-allowed;
            }
            .tag-span {
                height: 28px;
                line-height: 28px;
                display: inline-block;
                margin-right: 5px;
                padding: 0 10px;
                background: #ccc;
                border-radius: 4px;
                color: #fff;
            }

            .content-span {
                color: #666;
            }

            .placeholder-span {
                color: #ccc;
            }
        }
    }
</style>
