<script>
  import {lineProps} from "../../consts/mixins";

  export default {
    name: 'CTreeItemLine',
    mixins: [
      lineProps,
    ],
    props: {
      hasChildren: {
        type: Boolean
      },
      hasFileIcon: {
        type: Boolean
      },
      levelNum: {
        type: Number,
        default() {
          return 0;
        }
      },
      lineHeight: {
        type: String,
        default() {
          return '';
        },
      },
    },
    data() {
      return {};
    },
    methods: {},
    render(h) {
      const {levelNum, lineHeight, hasChildren} = this;
      if (!levelNum) {
        return null
      }
      let count = levelNum * 2;
      return h('span',
          {
            class: ['line-box'],
            style: {
              height: lineHeight + 'px',
            }
          },
          [
            new Array(count).fill(1).map((item, index, arr) => {
              if (!index) {
                // 竖线
                return h('span',
                    {
                      style: {
                        width: (lineHeight / 2).toFixed(2) + 'px',
                        textAlign: 'right',
                      }
                    },
                    [
                      h('span',
                          {
                            style: {
                              display: 'inline-block',
                              width: '1px',
                              height: '100%',
                              background: '#aaa',
                            }
                          }
                      )
                    ]
                )
              } else if (index === arr.length - 1) {
                // 水平线
                return h('span',
                    {
                      style: {
                        width: (1.5 * lineHeight).toFixed(2) + 'px',
                      }
                    },
                    [
                      h('span',
                          {
                            style: {
                              display: 'inline-block',
                              width: '100%',
                              height: '1px',
                              background: '#aaa',
                              verticalAlign: 'middle'
                            }
                          }
                      )
                    ]
                )
              } else {
                if (index % 2) {
                  // 父元素水平线
                  return h('span',
                      {
                        style: {
                          // 两倍展开图标长
                          width: (lineHeight * 2) + 'px',
                        }
                      }
                  )
                } else if (index >= (-1) * 2) {
                  // 子元素竖线
                  return h('span',
                      {
                        style: {
                          width: '1px',
                        }
                      },
                      [
                        h('span',
                            {
                              style: {
                                display: 'inline-block',
                                width: '1px',
                                height: hasChildren ? '100%' : '60%',
                                background: '#aaa',
                                verticalAlign: 'top'
                              }
                            }
                        )
                      ]
                  )
                }
              }
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

    .line {
        &-box {
            display: flex;
        }

        &-item {
            text-align: center;

            > span {
                display: inline-block;
            }
        }
    }
</style>
