<script>
  import classNames from 'classnames';

  export default {
    name: 'CSwitch',
    props: {},
    mixins:[],
    data() {
      return {};
    },
    computed: {
      xClass() {
        const prefix = this.prefix ? this.prefix + '-' : '';
        return classNames({});
      }
    },
    methods: {},
    render(h) {
      return h('div',
          {},
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
</style>
