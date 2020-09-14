<script>
  import {
    checkboxProps,
    conditionPropsMix,
    controllersProps,
    fileIconProps,
    lineProps, multipleProps,
    reflectKeyProps
  } from "../../consts/mixins";
  import CTreeItemLine from "./CTreeItemLine";
  import CTreeExpandIcon from "./CTreeExpandIcon";
  import CTreeFileIcon from "./CTreeFileIcon";
  import CTreeControllerBox from "./CTreeControllerBox";
  import {createSingleIcon} from "../../utils";
  import _ from 'lodash'

  export default {
    name: 'CTreeItem',
    components: {
      CTreeItemLine,
      CTreeExpandIcon,
      CTreeFileIcon,
      CTreeControllerBox,
    },
    mixins: [
      reflectKeyProps,
      lineProps,
      fileIconProps,
      controllersProps,
      conditionPropsMix,
      checkboxProps,
      multipleProps
    ],
    props: {
      dirtySelectedData: {
        type: Array,
        default() {
          return [];
        }
      },
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
      return {
        activeIndex: -1,
        editContent: ''
      };
    },
    methods: {
      removeLastChildrenHandle() {
        this.markDownListData.pop();
        this.editContent = '';
      },
      cancelEditModelHandle(itemData) {
        this.$set(itemData, 'status', '');
        this.editContent = '';
      },
      editItemHandle(params, itemData) {
        const keyName = this.reflectKey['key'];
        if (this.editContent !== itemData[keyName]) {
          this.$emit('editItemHandle', params);
        }
        this.cancelEditModelHandle(itemData)
      },
      deleteItemHandle(value, selfMarkId) {
        this.$emit('deleteItemHandle', value, selfMarkId);
      },
    },

    render(h) {
      const {
        markDownListData = [],
        reflectKey,
        levelNum,
        line,
        fileIcon,
        controllers,
        dirtySelectedData,
        lineHeight,
        activeIndex, // 操作按钮显示
        conditionProps,
        checkbox,
        multiple,

        removeLastChildrenHandle, // 移除添加的末尾函数
        cancelEditModelHandle, // 取消编辑状体
        editItemHandle, // 编辑按钮
        deleteItemHandle, // 删除按钮
      } = this;
      const keyName = reflectKey['key'];
      return h('ul',
          {
            class: ['tree-ul']
          },
          [
            markDownListData.map((item, index) => {
              const cloneItem = _.cloneDeep(item);
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
                          },
                          on: {
                            mouseenter: () => {
                              this.$set(this, 'activeIndex', index)
                            },
                            mouseleave: () => {
                              this.$set(this, 'activeIndex', -1)
                            }
                          }
                        },
                        [
                          h('span',
                              {
                                class: ['content-wrap'],

                              },
                              [
                                h('CTreeItemLine',
                                    {
                                      props: {
                                        line,
                                        levelNum,
                                        lineHeight,
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
                                h('span',
                                    {
                                      on: {
                                        click: () => {
                                          this.$emit('listChangeHandle', item);
                                        },
                                      },
                                      style:{
                                        display:'flex',
                                        flex: 1,

                                      }
                                    },
                                    [
                                      multiple && checkbox ? h('CCheckbox', {
                                        props: {
                                          option: cloneItem,
                                          reflectKey: this.reflectKey,
                                          width: '16',
                                          height: '16',
                                          noText: true,
                                          checkedData: [cloneItem],
                                        },
                                        style: {
                                          marginRight: '8px',
                                        }
                                      }) : null,
                                      item.status === 'edit' ? h('CInput',
                                          {
                                            props: {
                                              size: 'ssmall',
                                              value: this.editContent || [item[keyName]],
                                            },
                                            on: {
                                              input: (v) => {
                                                this.editContent = v
                                              },
                                              focus: () => {
                                                this.editContent = item[keyName]
                                              },
                                            }
                                          }
                                      ) : h('span',
                                          {
                                            class: [item.checked ? 'active' : null, 'text-content'],
                                          },
                                          [item[keyName]]
                                      )
                                    ]
                                ),

                              ]
                          ),
                          /* */
                          h('CTreeControllerBox',
                              {
                                props: {
                                  controllers,
                                  itemData: item,
                                  componentIndex: index,
                                  activeIndex,
                                  conditionProps,
                                  markDownListData,
                                },
                                on: {
                                  removeLastChildrenHandle,
                                  cancelEditModelHandle,
                                  editItemHandle,
                                  deleteItemHandle,
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
                            conditionProps,
                            checkbox,
                            multiple,
                          },
                          on: {
                            editItemHandle: this.$listeners.editItemHandle,
                            deleteItemHandle: this.$listeners.deleteItemHandle,
                            listChangeHandle: this.$listeners.listChangeHandle,
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

      .content-wrap {
        display: flex;
        flex: 1;
        align-items: center;
      }

      span.active {
        color: $primary;
        font-weight: bold;
      }

      .text-content {
        flex: 1;
      }

      &:hover {
        background: lighten($info, 10%);

        span.active {
          color: #fff;
        }
      }
    }
  }
</style>
