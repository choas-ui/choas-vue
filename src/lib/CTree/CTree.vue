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
    getCheckedValue,
    markListDataIdentify,
    removeDirtyKey,
    syncTreeListData, treeSelectListChangeHandle
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
      }
    },
    data() {
      return {
        backUpListData: [], // 备份数据
        markDownListData: [], // 标记数据
        dirtySelectedData: [], // 脏数据
      };
    },
    computed: {
      filterDirtySelectedDataByCondition(){
        return this.dirtySelectedData.filter(item=>!item[this.conditionProps])
      },
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
       treeSelectListChangeHandle(this, itemData)
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
        handler(v, old) {
          if (!_.isEqual(v, old)) {
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
        handler(v, old) {
          if (!_.isEqual(v, old)) {
            const pureSelectedValue = removeDirtyKey(this.filterDirtySelectedDataByCondition, treeDirtyKeys);
            this.$emit('input', pureSelectedValue);
            this.$emit('getDirtySelectedData', v);
            this.$emit('getMarkDownListData', this.markDownListData);
          }
        },
        deep: true,
        immediate: true
      },
      // 搜索
      searchStr(v) {
        if (v) {
          const listData = _.cloneDeep(this.backUpListData);
          this.filterData(listData, v, this.reflectKey['key']);
          this.$set(this, 'markDownListData', listData);
        } else {
          this.$set(this, 'markDownListData', _.cloneDeep(this.backUpListData));
        }
      },
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
        searchStr,

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
                    searchStr,
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
