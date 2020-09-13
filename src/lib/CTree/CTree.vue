<script>
  import classNames from 'classnames';
  import _ from 'lodash';
  import {
    checkboxProps,
    conditionPropsMix,
    controllersProps,
    fileIconProps,
    lineProps,
    multipleProps,
    reflectKeyProps,
    searchStrProps
  } from "../../consts/mixins";
  import {
    changeChildrenNodeStatus,
    changeParentNodeStatus, findIndexInArray, isInArray,
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
      multipleProps
    ],
    props: {
      // 外层组件已经同步,阻止tree标记同步数据,提升性能.
      isAlreadyMarked: {
        type: Boolean,
      },
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
      updateListData(type, selfMarkId, value) {
        // 更新 markDownListData backUpListData  dirtySelectedData
        // value 为null 删除  dirtySelectedData 父节点children依次向上传递
      },
      editItemHandle(params, itemData) {
        this.$emit('editItemHandle', params, itemData);
      },
      deleteItemHandle(value, selfMarkId) {
        this.$emit('deleteItemHandle', value, selfMarkId);
      },
      // 修改列表
      listChangeHandle(itemData) {
        const {reflectKey, conditionProps, multiple, dirtySelectedData, markDownListData} = this;
        const valueName = reflectKey['value'];
        const copyValue = _.cloneDeep(this.value);
        let lists;
        itemData.checked = !itemData.checked;
        console.log(markDownListData)
        if (multiple) {
          if (!itemData.disabled) {
            return false;
          }
          lists = [];
          const index = findIndexInArray(copyValue, itemData, valueName);
          if (index < 0) {
            copyValue.push(itemData);
          } else {
            copyValue.splice(index, 1)
          }
          // 多选
          //  向上遍历副元素 点选情况判断父元素是否半选或者全选 同时修改list
          //  再向下遍历子元素 向下依次全选 或者半选父元素 同时修改list
          syncTreeListData(markDownListData, markDownListData, copyValue, valueName, multiple, lists);
          this.$set(this, 'markDownListData', markDownListData);
          this.$set(this, 'backUpListData', _.cloneDeep(markDownListData));
        } else {
          if (!itemData.disabled || itemData[conditionProps]) {
            return false;
          }
          // 单选
          lists = dirtySelectedData;
          if (lists.find(list => list[valueName] === itemData[valueName])) {
            lists = []
          } else {
            lists = [itemData]
          }
        }
        this.$set(this, 'dirtySelectedData', lists);
      },
    },
    watch: {
      listData: {
        handler(v) {
          // 标记数据
          const markDownListData = this.isAlreadyMarked ? _.cloneDeep(v) : markListDataIdentify(_.cloneDeep(v));
          const dirtySelectedData = [];
          syncTreeListData(this.markDownListData, this.markDownListData, _.cloneDeep(v), this.reflectKey['value'], this.multiple, dirtySelectedData);
          this.$set(this, 'markDownListData', markDownListData);
          this.$set(this, 'backUpListData', _.cloneDeep(markDownListData));
          this.$set(this, 'dirtySelectedData', dirtySelectedData);
        },
        deep: true,
        immediate: true,
      },
      value: {
        handler(v) {
          const pureSelectedValue = removeDirtyKey(this.dirtySelectedData, treeDirtyKeys);
          if (!_.isEqual(v, pureSelectedValue)) {
            // 根据已选值同步渲染树形数据
            const dirtySelectedData = [];
            // 无需处理数据
            if (this.isAlreadyMarked) {
              dirtySelectedData.concat(v);
            } else {
              syncTreeListData(this.markDownListData, this.markDownListData, _.cloneDeep(v), this.reflectKey['value'], this.multiple, dirtySelectedData);
            }
            this.$set(this, 'backUpListData', this.markDownListData);
            this.$set(this, 'markDownListData', this.markDownListData);
            this.$set(this, 'dirtySelectedData', dirtySelectedData);
          }
        },
        deep: true,
        immediate: true
      },
      dirtySelectedData: {
        handler(v) {
          const pureSelectedValue = removeDirtyKey(v, treeDirtyKeys);
          this.$emit('input', pureSelectedValue);
        },
        deep: true,
        immediate: true
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
