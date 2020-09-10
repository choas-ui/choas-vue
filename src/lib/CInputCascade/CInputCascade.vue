<script>
  import classNames from 'classnames';
  import {markListDataIdentify} from "../../utils";
  import _ from 'lodash';

  export default {
    name: 'CInputCascade',
    props: {
      listData:{
        type: Array,
        default(){
          return [];
        }
      }
    },
    data() {
      return {
        copyListData: [],
        inputListData:[],
      };
    },
    computed: {
      xClass() {
        const prefix = this.prefix ? this.prefix + '-' : '';
        return classNames({});
      },
      getClassWrap() {
        const prefix = this.prefix ? this.prefix + '-' : '';
        return classNames({
          [prefix + 'input-cascade-wrap']: true,
        });
      }
    },
    methods: {
      renderOneDListData(h){
        return h('div',[123]);
      }
    },
    watch:{
      listData:{
        handler(v){
          if(!_.isEqual(v,this.copyListData)){
            this.$set(this,'copyListData', markListDataIdentify(v));
          }
        },
        deep: true,
        immediate: true,
      },
    },
    render(h) {
      return h('div',
          {
            class: this.getClassWrap
          },
          [
            !this.listData.length||this.listData.length>1 ?
                this.renderOneDListData(h): null
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

    .input-cascade{
        &-wrap{
            display: flex;
            flex-wrap: wrap;
        }
    }
</style>
