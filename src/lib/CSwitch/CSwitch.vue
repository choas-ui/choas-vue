<script>
  import classNames from 'classnames';
  import {classNameProps, prefixProps, sizeProps} from "../../consts/mixins";
  import {heightSizeConfig} from "../../consts/heightConfig";

  export default {
    name: 'CSwitch',
    mixins: [
      prefixProps, classNameProps, sizeProps
    ],
    props: {
      value:{
        validate(v) {
          return ['opening','closing','pending'].includes(v);
        },
        default(){
          return 'opening';
        }
      },
      bgColor: {
        type: String,
        default() {
          return '#ccc'
        }
      },
      shape: {
        validate(v) {
          return ['rect', 'circle'].includes(v)
        },
        default() {
          return 'rect'
        }
      },
      borderRadius: {
        type: String,
        default() {
          return "4";
        }
      },
      width: {},
      height: {},
    },
    data() {
      return {
        status: this.value
      };
    },
    computed: {
      xClass() {
        const prefix = this.prefix ? this.prefix + '-' : '';
        return classNames({});
      },
      getWrapClass() {
        const prefix = this.prefix ? this.prefix + '-' : '';
        return classNames({
          [prefix + 'switch-wrap']: true,
          [prefix + 'switch-llarge']: this.size === 'llarge',
          [prefix + 'switch-large']: this.size === 'large',
          [prefix + 'switch-default']: this.size === 'default' || !this.size,
          [prefix + 'switch-small']: this.size === 'small',
          [prefix + 'switch-ssmall']: this.size === 'ssmall',
        });
      }
    },
    methods: {},
    mounted() {
    },
    render(h) {
      const heightSize = heightSizeConfig[this.size || 'default'];
      const widthSize = (heightSize *2).toFixed(2);
      const widthBtnSize = (heightSize*0.9).toFixed(2);
      return h('div',
          {
            class: this.getWrapClass,
            style: {
              width: widthSize + 'px',
              borderRadius: this.shape === 'rect' ? this.borderRadius + 'px' : heightSize.toFixed(0) + 'px',
              background: this.bgColor,
              boxShadow: '0 0 5px #aaa inset ,0 0 5px #aaa',
            },
          },
          [
            h('div',
                {
                  class: ['switch-btn'],
                  style: {
                    width: widthBtnSize+'px',
                    height: widthBtnSize+'px',
                    // top:this.shape === 'rect' ? -addNum/2+'px' : '5%',
                    top:'5%',
                    left: this.status === 'opening'?'2%':'98%',
                    borderRadius: this.shape === 'rect' ? this.borderRadius + 'px' : heightSize.toFixed(0) + 'px',
                    boxShadow: '0 0 5px #aaa',
                  },
                  on:{
                    click: ()=>{

                    }
                  }
                },
            )
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
            position: relative;
        }
        &-btn{
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
