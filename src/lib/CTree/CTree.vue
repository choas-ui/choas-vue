<script>
  import classNames from 'classnames';
  import _ from 'lodash';
  import {
    checkboxProps,
    conditionPropsMix,
    controllersProps,
    fileIconProps, isAlreadyMarkedProps,
    lineProps,
    multipleProps,
    reflectKeyProps,
    searchStrProps
  } from "../../consts/mixins";
  import {
    changeChildrenNodeStatus,
    changeParentNodeStatus,
    getCheckedValue,
    markListDataIdentify,
    removeDirtyKey,
    syncTreeListData
  } from "../../utils";
  import {treeDirtyKeys} from "../../consts/consts";
  import CTreeItem from "./CTreeItem";

  export default {
    name: 'CTree',
    components: {
      CTreeItem
    },
    mixins: [
      reflectKeyProps,
      multipleProps,
      searchStrProps,
      lineProps,
      fileIconProps,
      controllersProps,
      conditionPropsMix,
      checkboxProps,
      multipleProps,
      isAlreadyMarkedProps,
    ],
    props: {
      listData: {
        type: Array,
        default() {
          return []
        },
      },
      value: {
        type: Array,
        default() {
          return [];
        },
      },
      lineHeight: {
        type: String,
        default() {
          return '';
        },
      },

    },
    data() {
      return {
        backUpListData: [], // 备份数据
        markDownListData: [], // 标记数据
        dirtySelectedData: [], // 脏数据
      };
    },
    mounted() {
    },
    computed: {
      getTreeWrap() {
        const prefix = this.prefix ? this.prefix + '-' : '';
        return classNames({
          [prefix + 'tree-wrap']: true
        });
      }
    },
    methods: {
      // updateListData(type, selfMarkId, value) {
      //   // 更新 markDownListData backUpListData  dirtySelectedData
      //   // value 为null 删除  dirtySelectedData 父节点children依次向上传递
      // },
      editItemHandle(params, itemData) {
        this.$emit('editTreeNode', params, itemData);
      },
      deleteItemHandle(value, selfMarkId) {
        this.$emit('deleteItemHandle', value, selfMarkId);
      },
      // 修改列表
      listChangeHandle(itemData) {
        const {conditionProps, multiple, dirtySelectedData, markDownListData} = this;
        if (!multiple) {
          // 单选情况简单处理
          if (itemData.disabled || itemData[conditionProps]) {
            return false;
          }
          if (dirtySelectedData[0]) {
            this.$set(dirtySelectedData[0], 'checked', false);
            this.$set(dirtySelectedData[0], 'halfChecked', false);
          }
          if (_.isEqual(dirtySelectedData[0], itemData)) {
            this.$set(this, 'dirtySelectedData', [])
          } else {
            this.$set(itemData, 'checked', true);
            this.$set(this, 'dirtySelectedData', [itemData])
          }
        } else {
          this.$set(itemData, 'checked', !itemData.checked);
          this.$set(itemData, 'halfChecked', false);
          // 多选
          //  向上遍历副元素 点选情况判断父元素是否半选或者全选 同时修改list
          //  再向下遍历子元素 向下依次全选 或者半选父元素 同时修改list
          const lists = [];
          changeParentNodeStatus(this, markDownListData, itemData._c_tree_parent_id);
          changeChildrenNodeStatus(this, itemData, itemData.checked);
          getCheckedValue(markDownListData, lists);
          this.$set(this, 'dirtySelectedData', lists);
        }
      },
    },
    watch: {
      listData: {
        handler(v) {
          if (!_.isEqual(this.markDownListData, v)) {
            // 标记数据
            const {isAlreadyMarked, reflectKey, multiple, value} = this;
            if (isAlreadyMarked) {
              this.$set(this, 'markDownListData', v);
              this.$set(this, 'backUpListData', _.cloneDeep(v));
              return;
            }
            const markDownListData = markListDataIdentify(_.cloneDeep(v));
            syncTreeListData(this, markDownListData, markDownListData, _.cloneDeep(value), reflectKey['value'], multiple);
            this.$set(this, 'markDownListData', markDownListData);
            this.$set(this, 'backUpListData', _.cloneDeep(markDownListData));
            const lists = [];
            getCheckedValue(markDownListData, lists, multiple);
            this.$set(this, 'dirtySelectedData', lists);
          }
        },
        deep: true,
        immediate: true,
      },
      value: {
        handler(v,old) {
          if (!_.isEqual(v,old)) {
            const {isAlreadyMarked, reflectKey, multiple} = this;
            if (isAlreadyMarked) {
              this.$set(this, 'dirtySelectedData', v);
            } else {
              const markDownListData = markListDataIdentify(_.cloneDeep(this.listData));
              syncTreeListData(this, markDownListData, markDownListData, _.cloneDeep(v), reflectKey['value'], multiple);
              this.$set(this, 'markDownListData', markDownListData);
              this.$set(this, 'backUpListData', _.cloneDeep(markDownListData));
              const lists = [];
              getCheckedValue(markDownListData, lists, multiple);
              this.$set(this, 'dirtySelectedData', lists);
            }
          }
        },
        deep: true,
        immediate: true
      },
      dirtySelectedData: {
        handler(v) {
          const pureSelectedValue = removeDirtyKey(v, treeDirtyKeys);
          this.$emit('input', pureSelectedValue);
          this.$emit('getDirtySelectedData', v);
          this.$emit('getMarkDownListData', this.markDownListData);
        },
        deep: true,
      },
      markDownListData: {
        handler(v) {
          this.$emit('getDirtySelectedData', this.dirtySelectedData);
          this.$emit('getMarkDownListData', v);
        },
        deep: true,
      }
    },
    render(h) {
      const {
        markDownListData = [],
        reflectKey,
        line,
        fileIcon,
        controllers,
        dirtySelectedData,
        conditionProps,
        checkbox,
        multiple,

        editItemHandle,
        deleteItemHandle,
        listChangeHandle,
      } = this;
      let {lineHeight} = this;
      if (!lineHeight) {
        lineHeight = _.get(this.$slots, 'expand-icon.0.componentOptions.propsData.height', '24');
      }
      return h('div',
          {
            class: this.getTreeWrap
          },
          [
            h('CTreeItem',
                {
                  props: {
                    markDownListData, // 树形数据
                    dirtySelectedData, // 已选数据
                    line, // 连线
                    reflectKey, // 映射
                    lineHeight, // 行高
                    fileIcon, // 显示文件
                    controllers,
                    conditionProps,
                    checkbox,
                    multiple,
                  },
                  on: {
                    editItemHandle,
                    deleteItemHandle,
                    listChangeHandle,
                  }
                },
                [
                  ...Object.keys(this.$slots).map((key) => {
                    const {tag} = this.$slots[key][0].componentOptions || {};
                    if (key === 'controllers') {
                      return this.$slots[key].map(item => {
                        const {tag, listeners = {}, propsData} = item.componentOptions || {};
                        if (tag)
                          return h(tag,
                              {
                                props: {
                                  ...propsData,
                                },
                                slot: 'controllers',
                                ...item.data,
                                on: listeners
                              }
                          );
                        return null
                      }).filter(Boolean)
                    }
                    if (this.$slots[key][0].componentOptions) {
                      return h(tag,
                          {
                            props: {
                              ...this.$slots[key][0].componentOptions.propsData
                            },
                            ...this.$slots[key][0].data
                          }
                      )
                    }
                  }).filter(Boolean)
                ]
            )
          ]
      );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../scss/functions";
  @import "../scss/size";
  @import "../scss/normal-bg";
  @import "../scss/variable";
  @import "../scss/comm-class";

</style>
