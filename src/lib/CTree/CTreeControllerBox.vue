<script>
  import {
    activeIndexProps,
    componentIndexProps,
    conditionPropsMix,
    controllersProps,
    reflectKeyProps
  } from "../../consts/mixins";
  import {createSingleIcon} from "../../utils";

  export default {
    name: 'CTreeControllerBox',
    mixins: [
      controllersProps,
      reflectKeyProps,
      activeIndexProps,
      componentIndexProps,
      conditionPropsMix,
    ],
    props: {
      itemData: {
        type: Object,
        default() {
          return {};
        },
      },
      markDownListData: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {};
    },
    methods: {},
    render(h) {
      const {
        controllers,
        itemData,
        reflectKey,
        activeIndex,
        componentIndex,
        conditionProps,
      } = this;
      const keyName = reflectKey['key'];
      const valueName = reflectKey['value'];
      if (!controllers && !(this.$slots['controllers'] || []).length) {
        return null;
      }
      if (activeIndex !== componentIndex) {
        return null;
      }
      if ((this.$slots['controllers'] || []).length) {
        return h('span',
            [
              (this.$slots['controllers'] || []).map(controller => {
                return createSingleIcon([controller], h, {}, itemData[valueName])
              })
            ]
        );
      }
      if (itemData.status === 'edit') {
        return h('span',
            [
              h('CIcon',
                  {
                    props: {
                      iconName: 'choas-selected',
                      color: '#1ac756',
                      activeColor: '#1ac756',
                    },
                    on: {
                      click: () => {
                        // 编辑
                        this.$emit('editItemHandle',
                            {
                              selfMarkId: itemData._c_tree_self_id,
                              [keyName]: itemData[keyName],
                            }
                            , itemData
                        );
                      }
                    }
                  },
              ),
              h('CIcon',
                  {
                    props: {
                      iconName: 'choas-close',
                      color: '#ff5e5c',
                      activeColor: '#ff5e5c',
                    },
                    on: {
                      click: () => {
                        // 取消编辑状态
                        if (itemData[valueName]) {
                          this.$emit('cancelEditModelHandle', itemData);
                        } else {
                          this.$emit('removeLastChildrenHandle');
                        }
                      },
                    },
                  },
              ),
            ]
        )
      }
      return h('span',
          [
            itemData[conditionProps] ? h('CIcon',
                {
                  props: {
                    iconName: 'choas-add',
                    color: '#1ac756',
                    activeColor: '#1ac756',
                  },
                  on: {
                    click: () => {
                      if (!itemData.children) {
                        this.$set(itemData, 'children', []);
                      }
                      itemData.children.push({
                        [keyName]: '',
                        status: 'edit',
                        _c_tree_parent_id: itemData._c_tree_parent_id,
                        _c_tree_self_id: itemData._c_tree_parent_id + '-' + itemData.children.length
                      });
                    },
                  },
                }
            ) : null,
            h('CIcon',
                {
                  props: {
                    iconName: 'choas-edit',
                    color: '#1890ff',
                    activeColor: '#1890ff',
                  },
                  on: {
                    click: () => {
                      this.$set(itemData, 'status', 'edit');
                    },
                  },
                },
            ),
            h('CIcon',
                {
                  props: {
                    iconName: 'choas-delete',
                    color: '#ff5e5c',
                    activeColor: '#ff5e5c',
                  },
                  on: {
                    click: () => {
                      this.$emit('deleteItemHandle',itemData[valueName], itemData._c_tree_self_id)
                    },
                  },
                }
            ),
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
