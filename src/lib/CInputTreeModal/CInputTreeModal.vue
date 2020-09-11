<template>
    <span>
        <template v-if="!canBeEdited">
            <div class="input-like-wrap">
                <div class="input-like input-like-unedited">
                    <template v-if="dirtyData.length">
                        <CTag v-for="(item, index) of dirtyData"
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
                      <template v-if="dirtyData.length && multiple">
                          <CTag v-for="(item, index) of dirtyData"
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
        <CTreeModal ref="cTreeModal"
                    :list-data="copyListData"
                    v-model="dirtyData"
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
  import {markIdentifyIfNotHave, removeDirtyKey} from "../../utils";


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
        selectedData: [],
        copyListData: [],
        dirtyData: []
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
        const valueKey = this.reflectKey['value'];
        const dirtyData = this.dirtyData.filter(item => item[valueKey] !== item[valueKey]);
        this.$set(this, 'dirtyData', dirtyData);
        $event.stopPropagation();
        $event.preventDefault();
      },
      // 同步数据
      syncCopyListData(copyListData, listData, selectData, valueKey, res = []) {
        if (Object.prototype.toString.call(listData) !== '[object Array]') {
          return;
        }
        if (Object.prototype.toString.call(selectData) !== '[object Array]') {
          return;
        }
        listData.forEach(item => {
          const index = selectData.findIndex(selected => selected[valueKey] === item[valueKey]);
          if (index > -1) {
            // 移除选中副本 减少遍历次数
            selectData.splice(index, 1);
            item.checked = true;
            delete item.halfChecked;
            // 修改当前值
            const itemInListData = _.cloneDeepWith(item, (v, k) => {
              // 不复制子元素
              if (k !== 'children') {
                return v
              }
            });
            res.push(itemInListData);
            if (this.multiple) {
              // 向上修改父类
              this.changeParentNodeStatus(copyListData, item._c_tree_parent_id);
              // 向下修改子类
              this.changeChildrenNodeStatus(item, item.checked);
            }
          }
          if (selectData.length) {
            this.syncCopyListData(copyListData, item.children, selectData, valueKey, res);
          }
        })
      },
      // 修改子节点属性
      changeChildrenNodeStatus(data, checked) {
        (data.children || []).forEach(item => {
          delete item.halfChecked;
          this.$set(item, 'checked', checked);
          this.changeChildrenNodeStatus(item, checked)
        })
      },
      // 修改父节点属性
      changeParentNodeStatus(lisData, parentPath, deep = true) {
        const parentValue = _.get(lisData, parentPath.split('-').join('.children.'), null);
        if (parentValue) {
          if (parentValue.children.every(item => !item.checked && !item.halfChecked)) {
            delete parentValue.checked;
            delete parentValue.halfChecked;
          } else if (parentValue.children.every(item => item.checked)) {
            delete parentValue.halfChecked;
            this.$set(parentValue, 'checked', true)
          } else {
            delete parentValue.checked;
            this.$set(parentValue, 'halfChecked', true)
          }
          if (deep) {
            this.changeParentNodeStatus(lisData, parentValue._c_tree_parent_id, deep)
          }
        }
      },
    },
    watch: {
      listData: {
        handler(v) {
          let copyListData = markIdentifyIfNotHave(v);
          this.$set(this, 'copyListData', copyListData);
        },
        deep: true,
        immediate: true
      },
      selectedData: {
        handler(v) {
          this.$emit('input', _.cloneDeep(v))
        },
        deep: true,
        immediate: true
      },
      dirtyData: {
        handler(v) {
          const keys = [
            '_c_tree_parent_id',
            '_c_tree_self_id',
            'checked',
            'halfChecked',
            'children',
            'expand',
          ];
          // 返回脏数据
          const pureCopyValue = removeDirtyKey(_.cloneDeep(v), keys);
          this.$set(this, 'selectedData', pureCopyValue);
        },
        deep: true,
      },
      value: {
        handler(v) {
          if (!_.isEqual(v, this.selectedData)) {
            const value = _.cloneDeep(v);
            // 同步列表数据
            const dirtyData = [];
            // 同步列表和选中值
            this.syncCopyListData(this.copyListData, this.copyListData, value, this.reflectKey['value'], dirtyData);
            this.$set(this, 'dirtyData', dirtyData);
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
