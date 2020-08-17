<script>
  import classNames from 'classnames'
  import _ from 'lodash'

  export default {
    name: 'CDatePicker',
    props: {
      width: {
        type: String,
        default() {
          return ''
        }
      }
    },
    data() {
      return {
        isDropUlShow: false,
        date: null,
        year: null,
        month: null,
        weekday: null,
        today: null,

      };
    },
    mounted() {
      this.date = new Date();
      this.year = this.date.getFullYear();
      this.month = this.date.getMonth();
      this.today = this.date.getDate();
      this.weekday = this.date.getDay();

      this.$nextTick(() => {
        document.addEventListener('click', ({target}) => {
          if (this.$refs.dateWrap && !this.$refs.dateWrap.contains(target)) {
            this.isDropUlShow = false;
          }
        });
      });
    },
    computed: {
      xClass() {
        const prefix = this.prefix ? this.prefix + '-' : '';
        return classNames(
        )
      },

      getDateWrapClass() {
        const prefix = this.prefix ? this.prefix + '-' : '';
        return classNames({
          [prefix + 'date-wrap']: true
        })
      },
    },
    methods: {
      createWeekdayTitle(h) {
        const wrapWidth = this.$refs.dateWrap.clientWidth - 18 - 14;
        let width = Math.floor((wrapWidth / 7));
        width = width <= 34 ? 34 : width;
        return ['日', '一', '二', '三', '四', '五', '六'].map((item, index) => {
          return h('div',
              {
                class: ['weekday-title'],
                style: {
                  width: width + 'px',
                  height: width + 'px',
                  lineHeight: width + 'px',
                  background: !index || index === 6 ? '#aaa' : '#fff',
                  color: !index || index === 6 ? '#fff' : '#666',
                }
              },
              [item]
          )
        })

      },
      createArrowBtns(h, args) {
        return h('div', [
          h('CIcon',
              {
                props: {
                  iconName: 'choas-double-' + args,
                }
              }
          ),
          h('CIcon',
              {
                props: {
                  iconName: 'choas-arrow-' + args
                }
              }
          )
        ])
      },
      createTitleInputs(h) {
        return h('div', [
          h('CInput',
              {
                props: {
                  noBorder: true,
                  width: '50',
                  maxLength: 4,
                }
              }
          ),
          h('CIcon',
              {
                props: {
                  iconName: 'choas-min'
                }
              }
          ),
          h('CInput',
              {
                props: {
                  noBorder: true,
                  width: '50',
                  maxLength: 2,
                }
              }
          ),
          h('CIcon',
              {
                props: {
                  iconName: 'choas-min'
                }
              }
          ),
          h('CInput',
              {
                props: {
                  noBorder: true,
                  width: '50',
                  maxLength: 2,
                },
              }
          )
        ])
      }
    },
    watch: {
      log: {
        handler(v) {
          v && v()
        },
        deep: true,
        immediate: true
      },

    },
    render(h) {
      return h('div',
          {
            ref: 'dateWrap',
            class: this.getDateWrapClass,
            style: {
              width: this.width ? this.width + 'px' : '100%',
            }
          },
          [
            h('CInput',
                {
                  size: this.size,
                  style: {
                    position: 'relative'
                  },
                  on: {
                    focus: () => {
                      this.isDropUlShow = true
                    }
                  }
                },
                [
                  h('CIcon',
                      {
                        slot: 'behind-icon',
                        props: {
                          iconName: 'choas-clock',
                          color: '#aaa',
                        },
                      }
                  )
                ]
            ),
            h('div',
                {
                  class: ['date-dropdown'],
                  style: {
                    display: this.isDropUlShow ? 'block' : 'none'
                  }
                },
                [
                  h('div',
                      {
                        class: ['date-dropdown-title-box']
                      },
                      [
                        this.createArrowBtns(h, 'left'),
                        this.createTitleInputs(h),
                        this.createArrowBtns(h, 'right'),
                      ]
                  ),
                  this.isDropUlShow && h('div',
                      {
                        class: ['date-dropdown-content-box']
                      },
                      [
                        this.createWeekdayTitle(h)
                      ]
                  ),
                  h('div',
                      {},
                      ['foot-box']
                  )
                ]
            )
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

    .date {
        &-wrap {
            position: relative;
        }

        &-dropdown {
            margin: 0;
            box-sizing: border-box;
            background: #fff;
            position: absolute;
            border-radius: addPX($sm-borderWt);
            padding: addPX($ssm-padding);
            width: 100%;
            min-width: 280px;
            top: calc(100% + 4px);
            z-index: 90;
            border: 1px solid $lineColor;

            &-title-box {
                display: flex;
                justify-content: space-around;
                align-items: center;
            }

            &-content-box {
                display: flex;
                flex-wrap: wrap;
                margin-top: addPX($ssm-margin);

                .weekday-title {
                    text-align: center;
                    border: 1px solid #ccc;
                    font-size: 16px;
                }
            }
        }
    }
</style>
