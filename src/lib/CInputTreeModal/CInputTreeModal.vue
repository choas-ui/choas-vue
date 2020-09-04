<template>
    <span>
        <template v-if="!canBeEdited">
            <div class="input-like-wrap">
                <div class="input-like input-like-unedited">
                    <template v-if="selectedData.length">
                        <CTag v-for="(item, index) of selectedData"
                              :key="index + item[reflectKey['value']]"
                        >
                            {{ item[[reflectKey['key']]] }}
                        </CTag>
                    </template>
                </div>
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
                    :is-show="isModalShow"
                    @toggleShow="v => this.isModalShow= v"
                    :condition-props="conditionProps"
                    :cascade-condition-props="cascadeConditionProps"
                    :add-tree-node="$listeners.addTreeNode? addTreeNode : null"
                    :reflect-key="reflectKey"
                    :multiple="multiple"
                    :checkbox="checkbox"
                    :controllers="controllers"

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
  import _ from 'lodash';
  import {
    classNameProps,
    conditionPropsMix,
    placeholderProps,
    prefixProps,
    reflectKeyProps,
    maskProps,
    lineProps,
    multipleProps,
    checkboxProps,
    draggableProps,
    cancelProps,
    canBeEditedProps,
    controllerColorProps,
    activeColorProps,
    controllersProps
  } from "../../consts/mixins";


  export default {
    name: 'CInputTreeModal',
    mixins: [
      conditionPropsMix, prefixProps, classNameProps,
      reflectKeyProps, placeholderProps, maskProps,
      lineProps, multipleProps, checkboxProps,
      draggableProps, cancelProps, canBeEditedProps,
      controllerColorProps, activeColorProps,controllersProps
    ],
    props: {
      cascadeConditionProps: {
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
      buttonTxt: {
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
      titleImg: {
        default() {
          return null
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
        selectedData: [],
      }
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
        const t = this.selectedData.filter(data => data[this.reflectKey['value']] !== item[this.reflectKey['value']]);
        this.$set(this, 'selectedData', t);
        $event.stopPropagation();
        $event.preventDefault();
      }
    },
    watch: {
      selectedData: {
        handler(v, old) {
          if (!_.isEqual(v, old)) {
            this.$emit('input', _.cloneDeep(v))
          }
        },
        deep: true,
        immediate: true
      },
      value: {
        handler(v, old) {
          if (!_.isEqual(v, old)) {
            this.$set(this, 'selectedData', _.cloneDeep(v))
          }
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

            .placeholder-span {
                color: #ccc;
            }
        }

        .input-button {
            margin-left: addPX($sm-margin);
        }
    }
</style>
