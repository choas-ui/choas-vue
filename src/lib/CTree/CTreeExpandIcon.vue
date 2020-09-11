<script>
  import classNames from 'classnames';
  import _ from 'lodash';

  export default {
    name: 'Button',
    props: {
      hasChildren: {
        type: Boolean
      },
      expand: {
        type: Boolean
      },
    },
    data() {
      return {};
    },
    methods: {},
    render(h) {
      const {hasChildren,expand} = this;
      if (!hasChildren) {
        return null
      }
      if (this.$slots['expand-icon'] && this.$slots['pick-up-icon']) {
        return  expand ? this.$slots['expand-icon'] : this.$slots['pick-up-icon'];
      }
      return h('CIcon',
          {
            props: {
              iconName: expand?'choas-fill-arrow-down':'choas-fill-arrow-right',
              activeColor: '#666'
            },
            on:{
              click :()=>{
                this.$emit('click');
              }
            }
          }
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
</style>
