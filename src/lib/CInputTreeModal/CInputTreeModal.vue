<template>
    <span>
        <template v-if="!canBeEdited">
            <div class="input-like-wrap">
                <div class="input-like input-like-unedited">
                    <template v-if="dirtySelectedData.length">
                        <CTag v-for="(item, index) of dirtySelectedData"
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
                      <template v-if="dirtySelectedData.length && multiple">
                          <CTag v-for="(item, index) of dirtySelectedData"
                                :key="index + item[reflectKey['value']]"
                                size="small"
                                @close="(e)=>removeHandle(item, e)"
                                active-color="#ff5e5c"
                          >
                          {{ item[[reflectKey['key']]] }}
                          </CTag>
                      </template>
                      <template v-if="dirtySelectedData.length && !multiple">
                          <CTag v-for="(item, index) of dirtySelectedData"
                                :key="index + item[reflectKey['value']]"
                                size="small"
                          >
                          {{ item[[reflectKey['key']]] }}
                          </CTag>
                      </template>
                  <template v-if="!dirtySelectedData.length">
                      <span class="placeholder-span">{{ placeholder }}</span>
                  </template>
              </div>
              <CButton class-name="input-button" v-if="buttonTxt"
                       @click="isModalShow = !isModalShow">{{buttonTxt}}</CButton>
          </div>
        </template>
        <CTreeModal ref="cTreeModal"
                    :list-data="markDownListData"
                    v-model="dirtySelectedData"
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
                    isAlreadyMarked
                    @getDirtySelectedData="getDirtySelectedData"
                    @getMarkDownListData="getMarkDownListData"

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
  import {
    changeChildrenNodeStatus,
    changeParentNodeStatus,
    getCheckedValue, isInArray,
    markListDataIdentify,
    removeDirtyKey,
    syncTreeListData
  } from "../../utils";
  import {treeDirtyKeys} from "../../consts/consts";


  export default {
    name: 'CInputTreeModal',
    mixins: [
      conditionPropsMix, prefixProps, classNameProps,
      reflectKeyProps, placeholderProps, maskProps,
      lineProps, multipleProps, checkboxProps,
      draggableProps, cancelProps, canBeEditedProps,
      controllerColorProps, activeColorProps, controllersProps
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
      },
      controllerColor: {
        type: String,
        default() {
          return '#fff';
        }
      },
      activeColor: {
        type: String,
        default() {
          return '#ff5e5c';
        }
      }
    },
    data() {
      return {
        isModalShow: false,
        dirtySelectedData: [],
        markDownListData: [],
      }
    },
    methods: {
      getDirtySelectedData(v) {
        this.$set(this, 'dirtySelectedData', v);
      },
      getMarkDownListData(v) {
        this.$set(this, 'markDownListData', v);
      },
      inputClick() {
        if (!this.buttonTxt) {
          this.isModalShow = true
        }
      },
      addTreeNode(v) {
        this.$emit('addTreeNode', v)
      },
      removeHandle(itemData, $event) {
        const {reflectKey, conditionProps, multiple, dirtySelectedData, markDownListData} = this;
        const valueName = reflectKey['value'];
        if (!multiple) {
          // 单选情况简单处理
          if (itemData.disabled || itemData[conditionProps]) {
            return false;
          }
          if (isInArray(dirtySelectedData, itemData, valueName)) {
            this.$set(dirtySelectedData[0], 'checked', false);
            this.$set(this, 'dirtySelectedData', []);
          } else {
            const preData = dirtySelectedData[0];
            if (preData) {
              this.$set(dirtySelectedData[0], 'checked', false);
            }
            this.$set(itemData, 'checked', true);
            this.$set(this, 'dirtySelectedData', [itemData]);
          }
        } else {
          console.log(itemData)
          this.$set(itemData, 'checked', !itemData.checked);
          // 多选
          //  向上遍历副元素 点选情况判断父元素是否半选或者全选 同时修改list
          //  再向下遍历子元素 向下依次全选 或者半选父元素 同时修改list
          const lists = [];
          changeParentNodeStatus(this, markDownListData, itemData._c_tree_parent_id);
          changeChildrenNodeStatus(this, itemData, itemData.checked);
          getCheckedValue(markDownListData, lists, multiple);
          this.$set(this, 'dirtySelectedData', lists);
        }
        $event.stopPropagation();
        $event.preventDefault();
      },
    },
    watch: {
      listData: {
        handler(v) {
          // 标记数据
          const markDownListData = markListDataIdentify(_.cloneDeep(v));
          const {multiple, reflectKey, value} = this;
          syncTreeListData(this, markDownListData, markDownListData, _.cloneDeep(value), reflectKey['value'], multiple);
          this.$set(this, 'markDownListData', markDownListData);
          const lists = [];
          getCheckedValue(markDownListData, lists, multiple);
          this.$set(this, 'dirtySelectedData', lists);
        },
        deep: true,
        immediate: true,
      },
      value: {
        handler(v,old) {
          if (!_.isEqual(v, old)) {
            let lists = [];
            const {markDownListData, reflectKey, multiple} = this;
            syncTreeListData(this, markDownListData, markDownListData, _.cloneDeep(v), reflectKey['value'], multiple);
            this.$set(this, 'markDownListData', markDownListData);
            getCheckedValue(this.markDownListData, lists, multiple);
            this.$set(this, 'dirtySelectedData', lists);
          }
        },
        deep: true,
        immediate: true
      },
      dirtySelectedData: {
        handler(v) {
          const pureSelectedValue = removeDirtyKey(v, treeDirtyKeys);
          this.$set(this, 'markDownListData', this.markDownListData);
          this.$emit('input', pureSelectedValue);
        },
        deep: true,
        immediate: true,
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
