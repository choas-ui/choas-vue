<script>
  import classNames from 'classnames';
  import _ from 'lodash';
  import {fileIconProps, lineProps, reflectKeyProps} from "../../consts/mixins";
  import CTreeItemLine from "./CTreeItemLine";
  import CTreeExpandIcon from "./CTreeExpandIcon";
  import CTreeFileIcon from "./CTreeFileIcon";

  export default {
    name: 'CTreeItem',
    components: {
      CTreeItemLine,
      CTreeExpandIcon,
      CTreeFileIcon
    },
    mixins: [
      reflectKeyProps,
      lineProps,
      fileIconProps,
    ],
    props: {
      markDownListData: {
        type: Array,
        default() {
          return [];
        }
      },
      levelNum: {
        type: Number,
        default() {
          return 0;
        }
      },
      lineHeight: {
        type: String,
      }
    },
    data() {
      return {};
    },
    methods: {
      createSingleIcon(data,h){
        if(!data){
          return null
        }
        const {tag, listeners = {}, propsData} = data[0].componentOptions || {};
        const {slot} = data[0].data || {};
        if (tag)
          return h(tag,
              {
                props: {
                  ...propsData,
                },
                slot,
                ...data.data,
                on: listeners
              }
          );
      }
    },
    render(h) {
      const {markDownListData = [], reflectKey, levelNum, line, fileIcon, dirtySelectedData, lineHeight} = this;
      const keyName = reflectKey['key'];
      const lastItemIndex = markDownListData.length - 1;

      return h('ul',
          {
            class: ['tree-ul']
          },
          [
            markDownListData.map((item, index) => {
              return h('li',
                  {
                    class: ['tree-li'],
                    style: {
                      lineHeight: parseInt(lineHeight, 10) + 'px',
                    }
                  },
                  [
                    h('p',
                        {
                          class: ['tree-p'],
                          style: {
                            lineHeight: parseInt(lineHeight, 10) + 'px',
                          }
                        },
                        [
                          h('CTreeItemLine',
                              {
                                props: {
                                  line,
                                  levelNum,
                                  lineHeight,
                                  isLast: lastItemIndex === index,
                                  hasChildren: Boolean((item.children || []).length),
                                  hasFileIcon: Boolean(fileIcon && this.$slots['file-icon']),
                                }
                              }
                          ),
                          h('CTreeExpandIcon',
                              {
                                props: {
                                  hasChildren: Boolean((item.children || []).length),
                                  expand: item.expand,
                                },
                                on: {
                                  click: ()=>{
                                    this.$set(item, 'expand', !item.expand)
                                  }
                                }
                              },
                              [
                                  this.createSingleIcon(this.$slots['expand-icon'],h),
                                  this.createSingleIcon(this.$slots['pick-up-icon'],h),

                              ]
                          ),
                          h('CTreeFileIcon',
                              {
                                props: {
                                  fileIcon,
                                }
                              },
                              [
                                this.createSingleIcon(this.$slots['file-icon'],h),
                              ]
                          ),

                          h('span', [item[keyName]])
                        ]
                    ),
                    item.expand ? h('CTreeItem',
                        {
                          props: {
                            markDownListData: item.children, // 树形数据
                            dirtySelectedData, // 已选数据
                            levelNum: levelNum + 1,
                            line,
                            lineHeight,
                            reflectKey,
                            fileIcon,
                          }
                        },
                        [
                          this.createSingleIcon(this.$slots['expand-icon'],h),
                          this.createSingleIcon(this.$slots['pick-up-icon'],h),
                          this.createSingleIcon(this.$slots['file-icon'],h),
                          this.$slots['controllers'],
                        ]
                    ) : null
                  ]
              )
            })
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

    .tree {
        &-ul {
            margin: 0;
            padding: 0;
            width: 100%;
            list-style: none;
        }

        &-li {
            display: flex;
            flex-wrap: wrap;
        }

        &-p {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            width: 100%;
            margin:0;
        }
    }
</style>
