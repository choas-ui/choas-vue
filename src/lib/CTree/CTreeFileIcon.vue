<script>
  import classNames from 'classnames';
  import _ from 'lodash';
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
    computed: {
      xClass() {
        const prefix = this.prefix ? this.prefix + '-' : '';
        return classNames(
        );
      }
    },
    methods: {},
    render(h) {
      const { fileIcon } = this;
      if(!fileIcon){
        return null
      }
      if(this.$slots['file-icon']){
        console.log(this.$slots['file-icon'])
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
