<template>
    <span>
        <template v-if="!canBeEdited">
          <div class="input-like input-like-unedited">
            <template v-if="selectedData.length">
                <CTag v-for="(item, index) of selectedData"
                      :key="index + item[reflectKey['value']]"
                >
                    {{ item[[reflectKey['key']]] }}
                </CTag>
            </template>
          </div>
        </template>
        <template v-else>
          <div class="input-like-wrap">
              <div class="input-like"
                   @click="inputClick"
              >
                      <template v-if="selectedData.length && multiple">
                          <CTag v-for="(item, index) of selectedData"
                                :key="index + item[reflectKey['value']]"
                                size="small"
                                style="margin-right: 10px"
                                @close="(e)=>removeHandle(item, e)"
                                active-color="#ff5e5c"
                          >
                          {{ item[[reflectKey['key']]] }}
                          </CTag>
                      </template>
                      <template v-if="selectedData.length && !multiple">
                          <CTag v-for="(item, index) of selectedData"
                                :key="index + item[reflectKey['value']]"
                                size="small"
                                style="margin-right: 10px"
                          >
                          {{ item[[reflectKey['key']]] }}
                          </CTag>
                      </template>
                  <template v-if="!selectedData.length">
                      <span class="placeholder-span">{{ placeholder }}</span>
                  </template>
              </div>
              <CButton class-name="input-button" v-if="buttonTxt"
                       @click="isModalShow = !isModalShow">{{buttonTxt}}</CButton>
          </div>
        </template>
        <CTreeModal :list-data="listData"
                    v-model="selectedData"
                    :title="title"
                    :isShow="isModalShow"
                    @toggleShow="v => this.isModalShow= v"
                    :conditionProps="conditionProps"
                    :addTreeNode="$listeners.addTreeNode? addTreeNode : null"
                    :reflectKey="reflectKey"
                    :multiple="multiple"

                    :width="width"
                    :height="height"
                    :top="top"
                    :left="left"
                    :mask="mask"
                    :line="line"
                    :cancel="cancel"
                    :draggable="draggable"
                    :controllerColor="controllerColor"
                    :activeColor="activeColor"
                    :placeholder="placeholder"
        ></CTreeModal>
    </span>
</template>
<script>
    export default {
        name: 'CInputTreeModal',
        props: {
            conditionProps: {
                type: String,
                default() {
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
            top: {
                type: String,
                default() {
                    return ''
                }
            },
            left: {
                type: String,
                default() {
                    return ''
                }
            },
            mask: {
                type: Boolean
            },
            line: {
                type: Boolean
            },
            cancel: {
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
        mounted() {
            this.selectedData = this.value
        },
        methods: {
            inputClick() {
                if (!this.buttonTxt) {
                    this.isModalShow = true
                }
            },
            addTreeNode(v) {
                this.$emit('addTreeNode', v)
            },
            removeHandle(item, $event) {
                const t = this.selectedData.filter(data => data[this.reflectKey['value']] !== item[this.reflectKey['value']])
                this.$set(this, 'selectedData', t)
                $event.stopPropagation();
                $event.preventDefault();
            }
        },
        watch: {
            selectedData: {
                handler(v) {
                    this.$emit('input', v)
                },
                deep: true,
                immediate: true
            },
            value: {
                handler(v) {
                    this.selectedData = v
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

    .input-like-wrap {
        font-size: addPX($df-fs);
        display: flex;

        .input-like {
            border: addPX($ssm-borderWt) solid #D9D9D9;
            border-radius: addPX($sm-radius);
            line-height: addPX($df-height);
            min-height: addPX($df-height);
            padding-left: addPX($sm-padding);
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;
            cursor: pointer;
            flex: 1;

            &-unedited {
                border: none;
                cursor: not-allowed;
                display: flex;
            }

            .tag-span {
                height: addPX($sm-height);
                line-height: addPX($sm-height);
                display: inline-block;
                margin-right: addPX($ssm-margin);
                padding: 0 addPX($sm-padding);
                background: #ccc;
                border-radius: addPX($sm-radius);
                color: #fff;
            }

            .content-span {
                color: #666;
            }

            .placeholder-span {
                color: #ccc;
            }
        }

        .input-button {
            margin-left: addPX($sm-margin);
        }
    }
</style>
