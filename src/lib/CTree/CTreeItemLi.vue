<script>
  import classNames from 'classnames';
  import _ from 'lodash';

  export default {
    name: 'CTreeItemLi',
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
      return h('div', {}, ['AAA']);
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
