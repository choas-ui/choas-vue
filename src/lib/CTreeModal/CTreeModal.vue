<template>
    <CModal v-model="isModalShow"
            :width="width"
            :height="height"
            :mask="mask"
            :cancel="cancel"
            :draggable="draggable"
            :controllerColor="controllerColor"
            :activeColor="activeColor"
            ref="treeModal"
    >
        <slot slot="header">
            <div class="modal-header"
                 :style="{
                    background: `url('${titleImg}') left center/100% 100%`
                 }"
            >
                {{title}}
            </div>
        </slot>

        <div :class="getWrapBoxClass">
            <div :class="getTreeBoxClass">
                <div :class="getTreeFootBoxClass"></div>
                <div class="search-box-wrap">
                    <CInput type="text" v-model="searchStr" :placeholder="noticeTxt" size="small"/>
                    <CButton size="small" v-if="addTreeNode" v-show="!isCascadeShow" @click="openCascade">新增</CButton>
                    <CButton size="small" v-show="isCascadeShow" @click="addTreeListHandle">保存</CButton>
                    <CButton size="small" v-show="isCascadeShow" type="danger" @click="addBtnCancelHandle">取消</CButton>
                </div>
                <CCascade v-model="cascadeData"
                          v-if="isCascadeShow"
                          :list-data="cascadeList"
                          :reflectKey="reflectKey"
                          :placeholder="placeholder"
                          :conditionProps="cascadeConditionProps || conditionProps"
                />
                <div class="content-box">
                    <div v-if="list_data.length">
                        <CTree
                                file-icon
                                :multiple="multiple"
                                :checkbox="checkbox"
                                :line="line"
                                v-model="selectedData"
                                :list-data="list_data"
                                :reflect-key="reflectKey"
                                :search-str="searchStr"
                                :condition-props="conditionProps"
                                :controllers="controllers"
                                @getDirtyData="getDirtyData"
                        />
                    </div>
                    <div v-else class="empty-box">
                        当前没有可选数据
                    </div>
                </div>
            </div>
            <div class="selected-box">
                <div :class="getTreeFootBoxClass">
                    已选{{dirtyData.length}}项
                </div>
                <div class="selected-content">
                    <p v-for="item of dirtyData"
                       :key="item[reflectKey['value']]"
                    >
                        <b>{{item[reflectKey['key']]}}</b>
                        <CIcon icon-name="choas-fill-close"
                               width="20"
                               height="20"
                               color="#666"
                               active-color="#ff5e5c"
                               :style="{
                                    lineHeight: '100%'
                               }"
                               @click="removeHandle(item)"
                        ></CIcon>
                    </p>
                </div>
            </div>
        </div>
        <slot slot="footer">
            <div class="modal-footer">
                <CButton type="danger" @click="cancelHandle">取&nbsp;&nbsp;消</CButton>
                <CButton @click="confirmHandle">确&nbsp;&nbsp;认</CButton>
            </div>
        </slot>
    </CModal>
</template>

<script>
  import _ from 'lodash'
  import { findDirtyValue } from "../../utils";
  import classNames from 'classnames'
  import defaultImg from './imgs/header.png'
  import {
    activeColorProps,
    cancelProps,
    checkboxProps, classNameProps, conditionPropsMix, controllerColorProps,
    controllersProps, draggableProps,
    lineProps, maskProps,
    multipleProps, placeholderProps, prefixProps,
    reflectKeyProps
  } from "../../consts/mixins";

  export default {
    name: 'CTreeModal',
    mixins: [
      reflectKeyProps, lineProps, multipleProps,
      checkboxProps, cancelProps, controllersProps,
      placeholderProps, controllerColorProps, maskProps,
      conditionPropsMix, prefixProps, classNameProps,
      activeColorProps, draggableProps
    ],
    props: {
      listData: {
        type: Array,
        default() {
          return []
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
      title: {
        type: String,
        default() {
          return ''
        }
      },
      isShow: {
        type: Boolean
      },
      titleImg: {
        default() {
          return defaultImg
        }
      },
      value: {
        type: Array,
        default() {
          return []
        }
      },
      // 级联不可选条件
      cascadeConditionProps: {
        type: String,
        default() {
          return ''
        }
      },
      addTreeNode: {
        type: Function
      },
    },
    data() {
      return {
        isCascadeShow: false,
        isModalShow: this.isShow,
        selectedData: [],
        dirtyData: [],
        searchStr: '',
        list_data: [],
        cascadeData: [],
        cascadeList: [],
        noticeTxt: '搜索节点'
      }
    },
    mounted() {
      this.list_data = _.cloneDeep(this.listData);
      this.cascadeList = _.cloneDeep(this.listData)
    },
    computed: {
      getTreeFootBoxClass() {
        const prefix = this.prefix ? this.prefix + '-' : '';
        return classNames(
            {
              [prefix + 'tree-footer-box']: true
            }
        )
      },
      getTreeBoxClass() {
        const prefix = this.prefix ? this.prefix + '-' : '';
        return classNames(
            {
              [prefix + 'tree-box']: true
            }
        )
      },
      getWrapBoxClass() {
        const prefix = this.prefix ? this.prefix + '-' : '';
        return classNames(
            this.className,
            {
              [prefix + 'tree-box-wrap']: true
            }
        )
      }
    },
    methods: {
      getDirtyData(v) {
        this.$set(this, 'dirtyData', v);
      },
      openCascade() {
        this.isCascadeShow = true
      },
      confirmHandle() {
        this.$emit('toggleShow', false);
        this.$emit('input', this.selectedData)
      },
      cancelHandle() {
        this.$emit('toggleShow', false);
        this.$set(this, 'selectedData', this.value)
      },
      addTreeListHandle() {
        const pId = this.cascadeData[this.cascadeData.length - 1] ? this.cascadeData[this.cascadeData.length - 1][this.reflectKey['value']] : '';
        this.addTreeNode({pId: pId || '', value: this.searchStr})
      },
      addBtnCancelHandle() {
        this.isCascadeShow = false;
        this.searchStr = ''
      },
      // 右侧移除按钮
      removeHandle(value,sign) {
        if(sign){
          // 按照父元素传来的值没有附带属性,需要查找
          value = findDirtyValue(value, this.list_data, this.reflectKey['value']) || {};
          console.log(value)
        }
        if (this.multiple) {
          const index = this.dirtyData.findIndex(item => item[this.reflectKey['value']] === value[this.reflectKey['value']]);
          if (index > -1) {
            // 删自己
            const data = this.dirtyData.splice(index, 1);
            // 移除选中节点的父节点 及子节点选中
            const targetItem = data[0];
            let listData = this.dirtyData;
            // 删父元素
            listData = this.removeParents(targetItem._c_tree_self_id, listData);
            // 删子元素
            listData = this.removeChildrenItem(targetItem.children, listData);
            this.$set(this, 'dirtyData', listData);
          }
        } else {
          this.dirtyData = []
        }
      },
      // 递归移除父元素
      removeParents(pId='', listData=[]){
        if(!pId.length){
          return listData;
        }
        listData = listData.filter(list => list._c_tree_self_id !== pId);
        const arr = pId.split('-');
        arr.pop();
        return this.removeParents(arr.join('-'),listData);
      },
      // 逐级移除子元素
      removeChildrenItem(data= [], listData=[]) {
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          listData = listData.filter(list => list._c_tree_self_id !== item._c_tree_self_id) || [];
          if ((item.children || []).length) {
            listData = this.removeChildrenItem(item.children, listData);
          }
        }
        return listData;
      },
      // 移除脏数据
      removeAppendKey(value) {
        const pureCopyValue = _.cloneDeep(value);
        pureCopyValue.forEach(item => {
          delete item._c_tree_parent_id;
          delete item._c_tree_self_id;
          delete item.checked;
          delete item.halfChecked;
          delete item.children;
          delete item.expand;
        });
        return pureCopyValue;
      },
    },
    watch: {
      value: {
        handler(v) {
          if (!_.isEqual(v, this.selectedData)) {
            this.$set(this, 'selectedData', v);
          }
        },
        deep: true,
        immediate: true
      },
      selectedData: {
        handler(v) {
          this.$emit('input', _.cloneDeep(v))
        },
        deep: true,
      },
      dirtyData: {
        handler(v) {
          // 返回脏数据
          const pureCopyValue = this.removeAppendKey(_.cloneDeep(v));
          this.$set(this, 'selectedData', pureCopyValue);
        },
        deep: true,
      },
      isShow(v) {
        this.isModalShow = v
      },
      isCascadeShow(v) {
        if (v) {
          this.noticeTxt = '请输入新增节点名称'
        } else {
          this.noticeTxt = '搜索节点'
        }
      },
      isModalShow(v) {
        if (!v) {
          // 关闭清空
          this.cascadeData = [];
          this.isCascadeShow = false;
          this.$emit('toggleShow', false);
          this.searchStr = '';
          this.$set(this, 'selectedData', this.value)
        }
      },
      listData: {
        handler(v) {
          if (!_.isEqual(v, this.list_data)) {
            this.$set(this, 'list_data', _.cloneDeep(v));
            this.$set(this, 'cascadeList', _.cloneDeep(v))
          }
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '../scss/variable';
    @import '../scss/size';
    @import '../scss/functions';

    .modal-header {
        width: 100%;
        height: 50px;
        color: #fff;
        font-size: 18px;
        font-weight: bold;
        letter-spacing: addPX($sm-letterSp);
    }

    .modal-footer {
        height: addPX($llg-height);
        line-height: addPX(llg-height);
    }

    .tree {
        &-box-wrap {
            height: 100%;
            display: flex;
            padding: 0 addPX($df-padding) 0 addPX($df-padding);
            box-sizing: border-box;
        }

        &-box {
            flex: 3;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;

            .search-box-wrap {
                padding-right: addPX($lg-padding);
                width: 100%;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;

                input {
                    width: 60%;
                    border: 1px solid $lineColor;
                    height: addPX($df-height);
                    line-height: addPX($df-height);
                    box-sizing: border-box;
                    border-radius: addPX($df-radius);
                    padding-left: addPX($df-padding);

                    &:focus {
                        outline: none;
                        border: 1px solid $primary;
                    }
                }
            }

            .title-box {
                width: 100%;
                height: addPX($df-height);
                line-height: addPX($df-height);
                font-size: addPX($lg-fs);
                background: $primary;
                color: #fff;
                text-indent: addPX($df-fs * 2);
                letter-spacing: addPX($df-letterSp);
                border-radius: addPX($sm-radius) addPX($sm-radius) 0 0;
            }

            .cascade-box {
                padding: addPX($lg-padding) addPX($lg-padding) 0 0;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                text-align: center;
            }

            .content-box {
                margin: addPX($lg-padding* 1.5) 0;
                width: 100%;
                flex: 1;
                box-sizing: border-box;
                overflow-y: auto;
                display: flex;

                .empty-box {
                    width: 100%;
                    align-self: center;
                    text-align: center;
                }
            }
        }

        &-footer-box {
            width: 100%;
            height: addPX($sm-height);
            text-align: right;
            line-height: addPX($sm-height);
            text-indent: addPX($df-fs * 2);
            letter-spacing: addPX($df-letterSp);
            padding-right: addPX($lg-padding);
            box-sizing: border-box;
        }

    }

    .selected-box {
        flex: 2;
        word-break: break-all;
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        flex-direction: column;

        & > .selected-content {
            width: 100%;
            height: 100%;
            flex: 1;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            border-left: addPX($ssm-borderWt) solid $lineColor;
            overflow-y: auto;

            > p {
                width: 100%;
                line-height: addPX($ssm-height);
                box-sizing: border-box;
                text-align: left;
                margin: addPX($sm-margin) 0 0 0;
                padding-left: addPX($df-padding);
                display: flex;
                font-size: addPX($df-fs);
                align-items: center;

                > b {
                    flex: 1;
                    text-align: left;
                }

                &:hover {
                    color: $primary;
                }
            }

        }
    }

</style>
