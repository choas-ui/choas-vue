<template>
    <span>
        <template v-if="!canBeEdited">
          <div class="input-like">
            <template v-if="selectedData.length">
              <span
                      v-for="(item, index) of selectedData"
                      :key="index + item[reflectKey['value']]"
                      :class="multiple ? 'tag-span' : 'content-span'"
              >
                {{ item[[reflectKey['key']]] }}
              </span>
            </template>
          </div>
        </template>
        <template v-else>
          <div class="input-like-wrap">
              <div class="input-like" @click="buttonTxt ? ()=>  this.isModalShow = !isModalShow: null">
                  <template v-if="selectedData.length">
                      <span
                              v-for="(item, index) of selectedData"
                              :key="index + item[reflectKey['value']]"
                              :class="multiple ? 'tag-span' : 'content-span'"
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

                   :isShow="isModalShow"
                   @toggleShow="v => this.isModalShow= v"
                   :title="title"
                   v-model="selectedData"
                   @addTreeList="addTreeList"
        ></TreeModal>
    </span>
</template>
<script>
    export default {
        name: 'InputTreeModal',
        props: {
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
        },
        data() {
            return {
                isModalShow: true,
                selectedData: this.value,
            }
        },
        methods: {
            addTreeList(v) {
                this.$emit('addTreeList', v)
            }
        },
        watch: {
            selectData(v) {
                this.$emit('input', v)
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
        .input-like{
            width: 70%;
            margin-right: addPX($lg-padding);
        }
    }
    .input-like {
        width: 100%;
        border: 1px solid #D9D9D9;
        border-radius: 4px;
        line-height: 36px;
        min-height: 36px;
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
