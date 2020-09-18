<script>
  import classNames from 'classnames';
  import _ from 'lodash';

  export default {
    name: 'CMenu',
    props: {
      listData:{
        type: Array,
        default(){
          return [];
        },
      },
      nextLevelIndent:{

      }
    },
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
      // 节点需要带入值
      return h('div',
          {
          },
          [
            this.$slots.default
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
</style>
