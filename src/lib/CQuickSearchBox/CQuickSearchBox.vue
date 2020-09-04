<script>
  import classNames from 'classnames';
  import _ from 'lodash'

  export default {
    name: 'CQuickSearchBox',
    props: {
      listData: {
        type: Array,
        default() {
          return []
        }
      },
      // 默认列数
      col: {
        type: Number,
        default() {
          return 3
        }
      },
      isAdvance: {
        type: Boolean
      },
      // 高度
      size: {
        validate(v) {
          return !v || ['ssmall', 'small', 'default', 'large', 'llarge'].includes(v)
        },
        default() {
          return 'small'
        }
      },
    },
    data() {
      return {
        copyOptionsData: [],
        advanceSearchModel: false,
      };
    },
    computed: {
      quickSearchBox() {
        const prefix = this.prefix ? this.prefix + '-' : '';
        return classNames(
            {
              [prefix + 'quick-search-box']: true
            }
        )
      },
      getCopyOptionsData() {
        if (this.advanceSearchModel) {
          return this.copyOptionsData;
        } else {
          return this.copyOptionsData.filter(item => item.model !== 'advance');
        }
      }
    },
    methods: {
      searchHandle() {
        const params = this.getCopyOptionsData.map(item => {
          let value;
          if (typeof item.value === 'object') {
            value = (item.value || []).map(v => v.value).filter(v => v !== undefined)
          } else {
            value = item.value;
          }
          return {
            [item.key]: value
          }
        });
        this.$emit('searchHandle', params)
      },
      resetHandle() {
        this.$set(this, 'copyOptionsData', this.listData);
        console.log(this.copyOptionsData)
      },
      toggleAdvance() {
        this.advanceSearchModel = !this.advanceSearchModel
      },
      renderComponent(h, options) {
        return h(options.tagName, {
          props: {
            size: this.size,
            listData: options.listData,
            value: options.value,
            placeholder: options.placeholder,
            reflectKey: options.reflectKey
          },
          key: options.tagName+options.key,
          on: {
            input: (v) => {
              this.$set(options,'value', v)
            },
          }
        })
      },
      renderControlBtn(h) {
        if (this.$slots['btn-box']) {
          Object.keys(this.$slots['btn-box'][0].data.on).forEach(key => {
            this.$slots['btn-box'][0].data.on[key] = this.$slots['btn-box'][0].data.on[key].bind(this, this.getCopyOptionsData)
          });
          return [this.$slots['btn-box']]
        }
        return [
          h('CButton',
              {
                props: {
                  type: 'primary',
                  size: 'ssmall',
                },
                on: {
                  click: () => {
                    this.searchHandle()
                  }
                }
              },
              ['查询']
          ),
          h('CButton',
              {
                props: {
                  type: 'ghost',
                  size: 'ssmall',
                },
                style: {
                  marginLeft: '10px'
                },
                on: {
                  click: () => {
                    this.resetHandle()
                  }
                }
              },
              ['重置']
          ),
          this.isAdvance ? h('CButton',
              {
                props: {
                  type: 'link',
                  size: 'ssmall',
                },
                style: {
                  marginLeft: '10px'
                },
                on: {
                  click: () => {
                    this.toggleAdvance()
                  }
                }
              },
              [
                '高级搜索',
                h('CIcon',
                    {
                      props: {
                        iconName: this.advanceSearchModel ? 'choas-arrow-top' : 'choas-arrow-down',
                        color: 'blue'
                      }
                    }
                )
              ]
          ) : null
        ]
      }
    },
    watch: {
      listData: {
        handler(v) {
          this.$set(this, 'copyOptionsData', _.cloneDeep(v));
        },
        deep: true,
        immediate: true
      }
    },
    render(h) {
      return h('div',
          {
            class: this.quickSearchBox
          },
          [
            ...this.getCopyOptionsData.map((options) => {
              return h('div',
                  {
                    style: {width: ((100 / this.col).toFixed(2)) + '%'}
                  },
                  [
                    h('span', {
                      class: 'search-title'
                    }, [
                      options.label + ':'
                    ]),
                    this.renderComponent(h, options),
                  ]
              )
            }),
            h('div',
                {
                  style: {
                    width: (this.col - (this.getCopyOptionsData || []).length % this.col) * (100 / this.col).toFixed(2) + '%',
                  }
                },
                [
                  ...this.renderControlBtn(h)
                ]
            ),
          ]
      )
    }
  }
</script>

<style lang="scss" scoped>
    @import "../scss/functions";
    @import "../scss/size";
    @import "../scss/normal-bg";
    @import "../scss/variable";
    @import "../scss/comm-class";

    .quick-search-box {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        & > div {
            margin: 6px 0;
            display: flex;
            word-break: keep-all;
            align-items: center;
            font-size: 14px;
            padding: 0 10px;
            box-sizing: border-box;
            justify-content: space-between;

            > span.search-title {
                margin-right: 10px;
            }

            &:last-of-type {
                justify-content: flex-end;
            }
        }
    }
</style>
