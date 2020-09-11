<script>
  import _ from 'lodash'
  import CTreeUl from "./CTreeUl";
  import {markListDataIdentify, markIdentifyIfNotHave} from '../../utils'
  import {
    checkboxProps,
    classNameProps,
    controllersProps,
    lineProps,
    multipleProps, prefixProps,
    reflectKeyProps
  } from "../../consts/mixins";

  export default {
    name: 'CTree',
    mixins: [
      lineProps, multipleProps, checkboxProps,
      controllersProps, controllersProps, reflectKeyProps,
      classNameProps, prefixProps
    ],
    components: {
      CTreeUl
    },
    props: {
      listData: {
        type: Array,
        default() {
          return []
        }
      },
      markColor: {
        type: String,
        default() {
          return '#ff5e5c'
        }
      },
      // 展开图标左间距
      markIconFixMarginRight: {
        type: Number,
        default() {
          return 0
        }
      },
      // 文件标识图标左间距
      fileIconFixMarginRight: {
        type: Number,
        default() {
          return 0
        }
      },
      searchStr: {
        type: String,
        default() {
          return ''
        }
      },
      editTreeNode: {
        type: Function
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
        copyListData: [], // 备份数据
        copyValue: [], // 内部选中值
        searchList: [],
        editItemId: '',
        addItemId: ''
      }
    },
    mounted() {

    },
    methods: {
      changeEditItemId(v) {
        this.editItemId = v;
      },
      changeAddItemId(v) {
        this.addItemId = v
      },
      // 同步数据
      syncCopyListData(copyListData, listData, selectData, valueKey,multiple, res = []) {
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
            if (multiple) {
              // 向上修改父类
              this.changeParentNodeStatus(copyListData, item._c_tree_parent_id);
              // 向下修改子类
              this.changeChildrenNodeStatus(item, item.checked);
            }
          }
          if (selectData.length) {
            this.syncCopyListData(copyListData, item.children || [], selectData, valueKey, res);
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
      // 获取当前选择的值
      getAllCheckedValue(copyListData, res = []) {
        (copyListData || []).forEach(item => {
          if (this.multiple) {
            if (item.checked || item.halfChecked) {
              this.getAllCheckedValue(item.children, res);
              if (item.checked && !item[this.conditionProps]) {
                res.push(item);
              }
            }
          } else {
            if (!res.length) {
              this.getAllCheckedValue(item.children, res);
              if (item.checked && !item[this.conditionProps]) {
                res.push(item);
              }
            }
          }

        });
        return res
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
      // 筛选数据
      filterData(data, v, key) {
        for (let i = 0; i < data.length; ++i) {
          const item = data[i];
          data[i].expand = true;
          if ((item.children || []).length) {
            this.filterData(item.children, v, key);
          }
          if (!(item.children || []).length) {
            delete item.children;
            if (item[key].indexOf(v) < 0) {
              data.splice(i, 1);
              --i;
            }
          }
        }
      },
    },
    model: {
      props: 'value',
      event: 'input'
    },
    watch: {
      listData:{
        handler(v){
          // 列表数据标记层级
          const copyListData = markListDataIdentify(_.cloneDeep(v));
          const value = _.cloneDeep(this.value);
          // 同步列表数据
          const copyValue = [];
          // 同步列表和选中值
          this.syncCopyListData(copyListData, copyListData, value, this.reflectKey['value'], copyValue);
          this.$set(this, 'copyValue', copyValue);
          this.$set(this, 'copyListData', copyListData);
          console.log(copyValue)
        },
        deep: true,
        immediate: true,
      },
      value: {
        handler(v, old) {
          // 获取原始格式值
          if (!_.isEqual(v, old)) {
            // 父节点传入 数据带有额外数据时 直接赋值
            let copyListData = markIdentifyIfNotHave(this.listData);
            const value = _.cloneDeep(v);
            // 同步列表数据
            const copyValue = [];
            // 同步列表和选中值
            this.syncCopyListData(copyListData, copyListData, value, this.reflectKey['value'], copyValue);
            this.$set(this, 'copyValue', copyValue);
            this.$set(this, 'copyListData', copyListData);
          }
        },
        deep: true,
        immediate: true,
      },
      copyListData: {
        handler(v) {
          this.$set(this, 'searchList', v);
          const res = this.getAllCheckedValue(v, []);
          this.$set(this, 'copyValue', res);
        },
        deep: true,
      },
      copyValue: {
        handler(v) {
          this.$emit('getDirtyData', v);
          const pureCopyValue = this.removeAppendKey(_.cloneDeep(v));
          if (!_.isEqual(this.value, pureCopyValue)) {
            this.$emit('input', pureCopyValue);
          }
        },
        deep: true,
        immediate: true
      },
      // 搜索
      searchStr(v) {
        if (v) {
          const listData = _.cloneDeep(this.copyListData);
          this.filterData(listData, v, this.reflectKey['key']);
          this.$set(this, 'searchList', listData);
        } else {
          this.$set(this, 'searchList', _.cloneDeep(this.copyListData));
        }
      },
    },
    render(h) {
      return h('CTreeUl',
          {
            props: {
              copyValue: this.copyValue,
              listData: this.searchList,
              copyListData: this.copyListData,
              line: this.line, // 线段
              reflectKey: this.reflectKey, // 映射
              searchStr: this.searchStr, // 搜索
              controllers: this.controllers, // 是否显示编辑按钮
              fileIconFixMarginRight: this.fileIconFixMarginRight, // 文件图标右边距
              markIconFixMarginRight: this.markIconFixMarginRight, // 标记图标右边距
              multiple: this.multiple, // 多选
              checkbox: this.checkbox, // 显示选择框
              changeChildrenNodeStatus: this.changeChildrenNodeStatus,
              changeParentNodeStatus: this.changeParentNodeStatus,
              conditionProps: this.conditionProps, // 不可选条件
              editTreeNode: this.editTreeNode, // 编辑节点
              editItemId: this.editItemId, // 在编辑状态的id
              addItemId: this.addItemId, // 在添加状态的id
              changeEditItemId: this.changeEditItemId, // 在添加状态的id
              changeAddItemId: this.changeAddItemId, // 在添加状态的id
            },
            on: {
              ...this.$listeners,
              changeEditItemId: (v) => {
                this.changeEditItemId(v)
              },
              changeAddItemId: (v) => {
                this.changeAddItemId(v)
              },
            }
          },
          /* 重新带入插槽 */
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
    },
  }
</script>
<style scoped lang="scss">
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";
</style>
