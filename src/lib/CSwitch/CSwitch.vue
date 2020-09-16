<script>
  import classNames from 'classnames';
  import {classNameProps, heightProps, prefixProps, sizeProps} from "../../consts/mixins";
  import {heightSizeConfig} from "../../consts/heightConfig";

  export default {
    name: 'CSwitch',
    mixins: [
      prefixProps, classNameProps, sizeProps,
      heightProps
    ],
    props: {
      value: {
        validate(v) {
          return ['opening', 'closing', 'pending'].includes(v);
        },
        default() {
          return 'closing';
        }
      },
      openText: {
        type: String,
        default() {
          return '';
        }
      },
      closeText: {
        type: String,
        default() {
          return '';
        }
      },
      openBg: {
        type: String,
        default() {
          return '#1ac756';
        }
      },
      isOutText: {
        type: Boolean,
      },
      closeBg: {
        type: String,
        default() {
          return '#a5a5a5';
        }
      },
      shape: {
        validate(v) {
          return ['rect', 'circle'].includes(v);
        },
        default() {
          return 'rect';
        }
      },
      borderRadius: {
        type: String,
        default() {
          return "4";
        }
      },
      height: {},
    },
    data() {
      return {
        status: 'closing',
      };
    },
    computed: {
      getBoxClass() {
        const prefix = this.prefix ? this.prefix + '-' : '';
        return classNames({
          [prefix + 'switch-box']: true,
          [prefix + 'switch-llarge']: this.size === 'llarge',
          [prefix + 'switch-large']: this.size === 'large',
          [prefix + 'switch-default']: this.size === 'default' || !this.size,
          [prefix + 'switch-small']: this.size === 'small',
          [prefix + 'switch-ssmall']: this.size === 'ssmall',
        });
      },
      getWrapClass() {
        const prefix = this.prefix ? this.prefix + '-' : '';
        return classNames({
          [prefix + 'switch-wrap']: true,
        });
      }
    },
    methods: {},
    mounted() {
    },
    watch: {
      value: {
        handler(v) {
          this.status = v
        },
        immediate: true,
        deep: true
      }
    },
    render(h) {
      const heightSize = this.height || heightSizeConfig[this.size || 'default'];
      const widthSize = (heightSize /0.4).toFixed(2);
      const widthBtnSize = (heightSize * 0.9).toFixed(2);
      const boxStyle = {
        width: widthSize + 'px',
        borderRadius: this.shape === 'rect' ? this.borderRadius + 'px' : heightSize.toFixed(0) + 'px',
        background: this.openBg,
        boxShadow: '0 0 5px #aaa inset ,0 0 5px #aaa',
        textAlign: this.status === 'opening' ? 'left' : 'right',
        lineHeight: heightSize + 'px',
      };
      // 按钮样式
      const btnStyle = {
        width: widthBtnSize + 'px',
        height: widthBtnSize + 'px',
        top: '6%',
        borderRadius: this.shape === 'rect' ? this.borderRadius + 'px' : heightSize.toFixed(0) + 'px',
        boxShadow: '0 0 5px #aaa',
      };
      if (this.status === 'opening') {
        delete btnStyle.left;
        btnStyle.right = '2%';
        boxStyle.background = this.openBg;
      } else {
        delete btnStyle.right;
        btnStyle.left = '2%';
        boxStyle.background = this.closeBg;
      }
      return h('div',
          {
            class: this.getWrapClass,
          },
          [
            h('div',
                {
                  class: this.getBoxClass,
                  style: boxStyle,
                },
                [
                  h('div',
                      {
                        class: ['switch-btn'],
                        style: btnStyle,
                        on: {
                          click: () => {
                            this.$emit('click')
                          }
                        }
                      },
                  ),
                  h('span',
                      {
                        class: ['inner-text']
                      },
                      [
                        !this.isOutText && this.status === 'opening' ? this.openText : '',
                      ]
                  ),
                  h('span',
                      {
                        class: ['inner-text']
                      },
                      [
                        !this.isOutText && this.status === 'closing' ? this.closeText : '',
                      ]
                  ),
                ]
            ),
            this.isOutText && this.status === 'opening' ? h('span',
                {
                  class: ['outer-text']
                },
                [
                  this.openText
                ]
            ) : null,
            this.isOutText && this.status === 'closing' ? h('span',
                {
                  class: ['outer-text']
                },
                [
                  this.closeText
                ]
            ) : null,
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

    .switch {
        &-wrap {
            display: flex;
            align-items: center;

            & > .outer-text {
                padding: 0 4px;
            }
        }

        &-box {
            position: relative;
            font-size: addPX($df-fs);

            & > .inner-text {
                padding: 0 10px;
                color: white;
            }
        }

        &-btn {
            position: absolute;
            background: #fff;
            cursor: pointer;
        }

        &-llarge {
            height: addPX($llg-height);
        }

        &-large {
            height: addPX($lg-height);
        }

        &-default {
            height: addPX($df-height);
        }

        &-small {
            height: addPX($sm-height);
        }

        &-ssmall {
            height: addPX($ssm-height);
        }
    }
</style>
