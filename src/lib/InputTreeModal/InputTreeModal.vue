<template>
    <span>
        <template v-if="!canBeEdited">
          <div class="input-like">
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
                   @click="isModalShow = true"
                   :style="{
                       width: buttonTxt?'70%': '95%',
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
              <Button v-if="buttonTxt" @click="isModalShow = !isModalShow" size="large">{{buttonTxt}}</Button>
          </div>
        </template>
        <TreeModal :list-data="listData"
                   :width="width"
                   :height="height"
                   :mask="mask"
                   :draggable="draggable"
                   :controllerColor="controllerColor"
                   :activeColor="activeColor"
                   :reflectKey="reflectKey"
                   :conditionProps="conditionProps"

                   :isShow="isModalShow"
                   @toggleShow="v => this.isModalShow= v"
                   :title="title"
                   v-model="selectedData"
                   :addTreeList="addTreeList"
        ></TreeModal>
    </span>
</template>
<script>
    export default {
        name: 'InputTreeModal',
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
                type: Object,
                required: true,
                default() {
                    return {}
                }
            },
            value: {
                type: Array,
                default() {
                    return []
                }
            },
            addTreeList: {
                type:Function
            },
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
        watch: {
            selectedData:{
                handler(v){
                    this.$emit('input', v)
                },
                deep: true
            }
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
        .input-like{
            margin:0 addPX($lg-padding);
        }
    }
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
</style>
