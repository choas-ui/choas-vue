<script>
  import {fileIconProps} from "../../consts/mixins";

  export default {
    name: 'CTreeFileIcon',
    mixins:[
        fileIconProps
    ],
    props: {},
    data() {
      return {};
    },
    methods: {},
    render(h) {
      const { fileIcon } = this;
      if(!fileIcon){
        return null
      }
      if(this.$slots['file-icon']){
        return  this.$slots['file-icon']
      }
      return h('CIcon', {
        props:{
          iconName: 'choas-file-icon'
        }
      });
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
