<script>
  import {controllersProps, reflectKeyProps} from "../../consts/mixins";
  import {createSingleIcon} from "../../utils";

  export default {
    name: 'CTreeControllerBox',
    mixins: [
      controllersProps,
      reflectKeyProps
    ],
    props: {
      itemData: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    data() {
      return {};
    },
    methods: {},
    render(h) {
      const {controllers, itemData, reflectKey} = this;
      const valueName = reflectKey['value'];
      if (!controllers && !(this.$slots['controllers'] || []).length) {
        return null;
      }
      if ((this.$slots['controllers'] || []).length) {
        return h('span',
            [
              (this.$slots['controllers'] || []).map(controller => {
                return createSingleIcon([controller], h, {}, itemData[valueName])
              })
            ]
        );
      }
      return h('span',
          [
            h('CIcon',
                {
                  props: {
                    iconName: 'choas-edit',
                    activeColor: '#1890ff',
                  }
                }
            ),
            h('CIcon',
                {
                  props: {
                    iconName: 'choas-delete',
                    activeColor: '#ff5e5c',
                  }
                }
            ),
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
