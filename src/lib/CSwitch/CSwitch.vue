<script>
  import classNames from 'classnames';
  import {classNameProps, prefixProps,sizeProps} from "../../consts/mixins";
  import {heightSizeConfig} from "../../consts/heightConfig";

  export default {
    name: 'CSwitch',
    mixins:[
        prefixProps,classNameProps,sizeProps
    ],
    props: {
      bgColor:{
        type: String,
        default(){
          return '#aaa'
        }
      },
      width: {

      },
      height: {

      },
    },
    data() {
      return {};
    },
    computed: {
      xClass() {
        const prefix = this.prefix ? this.prefix + '-' : '';
        return classNames({});
      },
      getWrapClass() {
        const prefix = this.prefix ? this.prefix + '-' : '';
        return classNames({
          [prefix+'switch-wrap']: true,
          [prefix+'switch-llarge']: this.size === 'llarge',
          [prefix+'switch-large']: this.size === 'large',
          [prefix+'switch-default']: this.size === 'default' || !this.size,
          [prefix+'switch-small']: this.size === 'small',
          [prefix+'switch-ssmall']: this.size === 'ssmall',
        });
      }
    },
    methods: {},
    mounted() {
      console.log(this.size)
    },
    render(h) {
      return h('div',
          {
            class: this.getWrapClass,
            style:{
              width: (heightSizeConfig[this.size || 'default']/0.4).toFixed()+'px',
              background: this.bgColor,
              boxShadow: '0 0 5px #aaa inset',
            }
          },
          []
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

    .switch{
        &-wrap{

        }
        &-llarge{
            height: addPX($llg-height);
        }
        &-large{
            height: addPX($lg-height);
        }
        &-default{
            height: addPX($df-height);
        }
        &-small{
            height: addPX($sm-height);
        }
        &-ssmall{
            height: addPX($ssm-height);
        }
    }
</style>
