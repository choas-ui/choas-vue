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
        dayInfo: {
          date: null,
          year: null,
          month: null,
          day: null,
          today: null,
        },
        dayList: [],
      };
    },
    mounted() {
      this.dayInfo.date = new Date();
      this.dayInfo.year = this.dayInfo.date.getFullYear();
      this.dayInfo.month = this.dayInfo.date.getMonth();
      this.dayInfo.day = this.dayInfo.date.getDate();
      this.dayInfo.today = this.dayInfo.day;
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
        // const prefix = this.prefix ? this.prefix + '-' : '';
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
      setDayListData(year, month) {
        const preMonth = new Date(year, month, 0); // 上月
        let preMonthLastDayWeekDay = preMonth.getDay(); // 上月最后一天的星期数
        const preMonthLastDay = preMonth.getDate(); // 上月的最后一天
        let count = preMonthLastDayWeekDay;
        while (count >= 0) {
          this.dayList.push({
            value: preMonthLastDay - count,
            type: 'preMonth'
          });
          count--;
        }
        const selectedMonth = new Date(year, month + 1, 0);
        const selectedMonthDay = selectedMonth.getDate();
        count = 1;
        while (count <= selectedMonthDay) {
          this.dayList.push({
            value: count++,
            type: 'selectedMonth'
          });
        }
        let nextMonthDay = 6 * 7 - this.dayList.length;
        count = 1;
        while (count <= nextMonthDay) {
          this.dayList.push({
            value: count++,
            type: 'nextMonth'
          });
        }

      },
      createDayList(h) {
        const wrapWidth = this.$refs.dateWrap.clientWidth - 18 - 14;
        let width = Math.floor((wrapWidth / 7));
        width = width <= 40 ? 40 : width;

        return this.dayList.map((item, index) => {
          return h('div',
              {
                class: ['day-list-item'],
                key: index,
                style: {
                  width: width + 'px',
                  height: width + 'px',
                  lineHeight: width + 'px',
                }
              },
              [item['value']]
          )
        })
      },
      createWeekdayTitle(h) {
        const wrapWidth = this.$refs.dateWrap.clientWidth - 18 - 14;
        let width = Math.floor((wrapWidth / 7));
        width = width <= 40 ? 40 : width;
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
              [
                h('span', [item])
              ]
          )
        })
      },
      createArrowBtns(h, args) {
        if (args === 'left') {
          return h('div', [
            h('CIcon',
                {
                  props: {
                    iconName: 'choas-double-' + args,
                  },
                  on: {
                    click: () => {
                      let year = this.dayInfo.year;
                      year--;
                      this.$set(this.dayInfo, 'year', year);
                    }
                  }
                }
            ),
            h('CIcon',
                {
                  props: {
                    iconName: 'choas-arrow-' + args,
                  },
                  on: {
                    click: () => {
                      let month = this.dayInfo.month;
                      month--;
                      this.$set(this.dayInfo, 'month', month);
                    }
                  }
                }
            )
          ])

        }
        return h('div', [

          h('CIcon',
              {
                props: {
                  iconName: 'choas-arrow-' + args
                },
                on: {
                  click: () => {
                    let month = this.dayInfo.month;
                    month++;
                    this.$set(this.dayInfo, 'month', month);
                  }
                }
              }
          ),
          h('CIcon',
              {
                props: {
                  iconName: 'choas-double-' + args,
                },
                on: {
                  click: () => {
                    let year = this.dayInfo.year;
                    year++;
                    this.$set(this.dayInfo, 'year', year);
                  }
                }
              }
          ),
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
                },
                attrs:{
                  value: this.dayInfo.year
                },
                on: {
                  input: (v) => {
                    let year = parseInt(v, 10);
                    if (year <= 1970) {
                      year = 1970;
                    }
                    if (year > 2100) {
                      year = 2100;
                    }
                    this.$set(this.dayInfo, 'year', year);
                  }
                }
              }
          ),
          h('CIcon',
              {
                props: {
                  iconName: 'choas-min'
                },
              }
          ),
          h('CInput',
              {
                props: {
                  noBorder: true,
                  width: '50',
                  maxLength: 2,
                },
                attrs:{
                  value: this.dayInfo.month+1
                },
                on: {
                  input: (v) => {
                    let month = parseInt(v, 10);
                    if (month <= 0) {
                      month = 1;
                    }
                    if (month > 12) {
                      month = 12;
                    }
                    this.$set(this.dayInfo, 'month', month-1);
                  }
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
                  value: this.dayInfo.day,
                },
                on: {
                  input: (v) => {
                    let day = parseInt(v, 10);
                    if (day <= 0) {
                      day = 1;
                    }
                    if (day > 31) {
                      day = 31;
                    }
                    this.$set(this.dayInfo, 'day', day);
                  }
                }
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
      dayInfo: {
        handler(v) {
          this.dayList = [];
          this.setDayListData(v.year, v.month+1);
        },
        deep: true
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
                        this.createWeekdayTitle(h),
                        this.createDayList(h),
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
            min-width: 320px;
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

                .day-list-item {
                    text-align: center;
                    border: 1px solid #ccc;
                    font-size: 16px;
                }
            }
        }
    }
</style>
