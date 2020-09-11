<script>
  import classNames from 'classnames';
  import _ from 'lodash';
  import {fileIconProps, lineProps, multipleProps, reflectKeyProps, searchStrProps} from "../../consts/mixins";
  import {markListDataIdentify, removeDirtyKey, syncTreeListData} from "../../utils";
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
    methods: {},
    watch: {
      listData: {
        handler(v) {
          // 标记数据
          const markDownListData = this.isAlreadyMarked ? _.cloneDeep(v) : markListDataIdentify(_.cloneDeep(v));
          this.$set(this, 'markDownListData', markDownListData);
          this.$set(this, 'backUpListData', _.cloneDeep(markDownListData));
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

            syncTreeListData(this.markDownListData, this.markDownListData, _.cloneDeep(v), this.reflectKey['value'], this.multiple, dirtySelectedData);
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
          this.$emit('input', pureSelectedValue)
        },
        deep: true,
        immediate: true
      }
    },
    render(h) {
      const {markDownListData = [], reflectKey, line, fileIcon, dirtySelectedData} = this;
      let {lineHeight} = this;
      if (!lineHeight) {
        lineHeight = _.get(this.$slots, 'expand-icon.0.componentOptions.propsData.height', '18');
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
