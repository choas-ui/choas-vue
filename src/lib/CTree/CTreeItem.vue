<script>
  import {controllersProps, fileIconProps, lineProps, reflectKeyProps} from "../../consts/mixins";
  import CTreeItemLine from "./CTreeItemLine";
  import CTreeExpandIcon from "./CTreeExpandIcon";
  import CTreeFileIcon from "./CTreeFileIcon";
  import CTreeControllerBox from "./CTreeControllerBox";
  import {createSingleIcon} from "../../utils";

  export default {
    name: 'CTreeItem',
    components: {
      CTreeItemLine,
      CTreeExpandIcon,
      CTreeFileIcon,
      CTreeControllerBox
    },
    mixins: [
      reflectKeyProps,
      lineProps,
      fileIconProps,
      controllersProps,
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
    methods: {},
    render(h) {
      const {
        markDownListData = [],
        reflectKey,
        levelNum,
        line,
        fileIcon,
        controllers,
        dirtySelectedData,
        lineHeight
      } = this;
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
                          h('span',
                              {
                                style: {
                                  display: 'flex'
                                },
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
                                        click: () => {
                                          this.$set(item, 'expand', !item.expand)
                                        }
                                      }
                                    },
                                    [
                                      createSingleIcon(this.$slots['expand-icon'], h),
                                      createSingleIcon(this.$slots['pick-up-icon'], h),
                                    ]
                                ),
                                h('CTreeFileIcon',
                                    {
                                      props: {
                                        fileIcon,
                                      }
                                    },
                                    [
                                      createSingleIcon(this.$slots['file-icon'], h),
                                    ]
                                ),
                                h('span', [item[keyName]])
                              ]
                          ),
                          /* */
                          h('CTreeControllerBox',
                              {
                                props: {
                                  controllers,
                                  itemData: item
                                }
                              },
                              [
                                (this.$slots['controllers'] || []).map(item => {
                                  return createSingleIcon([item], h)
                                })
                              ]
                          ),
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
                            controllers,
                          }
                        },
                        [
                          createSingleIcon(this.$slots['expand-icon'], h),
                          createSingleIcon(this.$slots['pick-up-icon'], h),
                          createSingleIcon(this.$slots['file-icon'], h),
                          (this.$slots['controllers'] || []).map(item => {
                            return createSingleIcon([item], h)
                          })
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
            justify-content: space-between;
            flex-wrap: nowrap;
            align-items: center;
            width: 100%;
            margin: 0;
            font-size: 14px;
        }
    }
</style>
