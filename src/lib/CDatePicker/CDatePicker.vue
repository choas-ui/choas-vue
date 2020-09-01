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
      },
      // 高度
      size: {
        validate(v) {
          return !v || ['ssmall', 'small', 'default', 'large', 'llarge'].includes(v)
        },
        default() {
          return 'default'
        }
      },
      quickSelectBox: {
        type: Boolean
      },

    },
    data() {
      return {
        isDropUlShow: false,
        dayInfo: {
          year: null,
          month: null,
          day: null,
          today: null,
        },
        dayList: [],
        selectValue:'',
      };
    },
    mounted() {
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
        return classNames({})
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
        this.dayList = this.dayList.map(item => {
          return {
            value: item.value < 10 ? '0' + item.value : item.value + '',
            type: item.type
          }
        })

      },
      getTodayDate() {
        const date = new Date();
        this.dayInfo.year = date.getFullYear();
        this.dayInfo.month =date.getMonth();
        this.dayInfo.day = date.getDate();
        this.dayInfo.today = this.dayInfo.day;
      },
      createDayList(h) {
        // const wrapWidth = this.$refs.dateWrap.clientWidth - 18 - 14;
        // let width = Math.floor((wrapWidth / 7));
        let width = 40;
        width = width <= 40 ? 40 : width;
        let spanWidth = parseInt((width * 0.8).toString(), 10);

        return this.dayList.map((item, index) => {
          return h('div',
              {
                class: classNames({
                  'day-list-item': true,
                  ['pre-month']: item.type === 'preMonth',
                  ['selected-month']: item.type === 'selectedMonth',
                  ['next-month']: item.type === 'nextMonth',
                  ['active']: this.dayInfo.today === parseInt(item.value, 10) && item.type === 'selectedMonth',
                }),
                key: index,
                style: {
                  width: width + 'px',
                  height: width + 'px',
                },
                on: {
                  click: () => {
                    let {year, month} = this.dayInfo;
                    const {today} = this.dayInfo;
                    let day = parseInt(item.value, 10);
                    if(item.type === 'preMonth'){
                      month--;
                      if(month<0){
                        month = 11;
                        year--;
                      }
                    }
                    if(item.type === 'nextMonth'){
                      month++;
                      if(month>11){
                        month = 0;
                        year++;
                      }
                    }
                    this.$set(this,'dayInfo', {
                      year,
                      month,
                      day,
                      today,
                    });
                  }
                }
              },
              [
                h('span',
                    {
                      style: {
                        width: spanWidth + 'px',
                        height: spanWidth + 'px',
                        lineHeight: spanWidth + 'px',
                      }
                    },
                    [
                      item['value']
                    ]
                )
              ]
          )
        })
      },
      createWeekdayTitle(h) {
        // const wrapWidth = this.$refs.dateWrap.clientWidth - 18 - 14;
        // let width = Math.floor((wrapWidth / 7));
        let width = 40;
        width = width <= 40 ? 40 : width;
        return ['日', '一', '二', '三', '四', '五', '六'].map((item, index) => {
          return h('div',
              {
                class: ['weekday-title'],
                style: {
                  width: width + 'px',
                  height: width + 'px',
                  lineHeight: width + 'px',
                  color: !index || index === 6 ? '#666' : '#aaa',
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
                  className: 'date-input',
                  noBorder: true,
                  width: '50',
                  maxLength: 4,
                },
                attrs: {
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
                  className: 'date-input',
                  noBorder: true,
                  width: '50',
                  maxLength: 2,
                },
                attrs: {
                  value: this.dayInfo.month + 1,
                },
                on: {
                  input: (v) => {
                    let month = parseInt(v, 10);
                    month--;
                    if (month < 0) {
                      month = 0;
                    }
                    if (month > 12) {
                      month = 12;
                    }
                    this.$set(this.dayInfo, 'month', month);
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
                  className: 'date-input',
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
          this.setDayListData(v.year, v.month, v.day);
        },
        deep: true
      },
      isDropUlShow: {
        handler() {
          this.getTodayDate();
        },
        immediate: true,
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
                  props:{
                    size: this.size,
                  },
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
                      {
                        class: ['date-footer-box'],
                      },
                      [
                        h('div',
                            {
                              class: ['quickly-box'],
                            },
                            [
                              this.quickSelectBox ? h('CButton',
                                  {
                                    props: {
                                      size: 'ssmall',
                                    }
                                  },
                                  ['本周']
                              ) : null,
                              this.quickSelectBox ? h('CButton',
                                  {
                                    props: {
                                      size: 'ssmall',
                                    }
                                  },
                                  ['本月']
                              ) : null,
                              this.quickSelectBox ? h('CButton',
                                  {
                                    props: {
                                      size: 'ssmall',
                                    }
                                  },
                                  ['本季度']
                              ) : null,
                            ]
                        ),
                        h('div',
                            {
                              class: ['confirm-box'],
                            },
                            [
                              h('CButton',
                                  {
                                    props: {
                                      size: 'ssmall',
                                    }
                                  },
                                  ['确认']
                              ),
                              h('CButton',
                                  {
                                    props: {
                                      type: 'danger',
                                      size: 'ssmall',
                                    },
                                    on:{
                                      click: ()=>{
                                        this.isDropUlShow = false;
                                      }
                                    }
                                  },
                                  ['取消']
                              ),
                            ]
                        ),
                      ]
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
            width: 300px;
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

                .weekday-title {
                    text-align: center;
                    font-size: 16px;
                    font-weight: bold;
                }

                .day-list-item {
                    text-align: center;
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    cursor: pointer;

                    > span {
                        display: inline-block;
                    }

                    &.pre-month {
                        color: #aaa;
                    }

                    &.next-month {
                        color: #aaa;
                    }

                    &.active {
                        & > span {
                            border-radius: 100%;
                            border: 2px solid $primary;
                        }
                    }
                }
            }

            .date-footer-box {
                display: flex;
                justify-content: space-between;

                & > .quickly-box {
                    width: calc(100% - 110px);
                    display: flex;
                    flex-wrap: wrap;
                }

                & > .confirm-box {
                    width: 100px;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }

        /deep/ &-input {
            input {
                text-align: center;
            }
        }
    }

</style>
