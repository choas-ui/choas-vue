<script>
  import {createSingleIcon} from "../../utils";

  export default {
    name: 'CTreeFileIcon',
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
      const {hasChildren, expand} = this;
      if (!hasChildren) {
        return null
      }
      const on ={
        click: ()=>{
            this.$emit('click');
        }
      };
      const props={
        activeColor: '#333',

      };
      if (this.$slots['expand-icon'] && this.$slots['pick-up-icon']) {
        return !expand ? createSingleIcon(this.$slots['expand-icon'], h , {on,props}) :
            createSingleIcon(this.$slots['pick-up-icon'], h,{on,props});
      }
      return h('CIcon',
          {
            props: {
              iconName: expand ? 'choas-fill-arrow-down' : 'choas-fill-arrow-right',
              activeColor: '#333',
              width: '24',
              height: '24'
            },
            on,
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
