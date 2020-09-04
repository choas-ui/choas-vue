<template>
    <span class="radio-group-wrap">
        <template v-if="isDataModel">
            <template v-if="type==='button'">
                <CButtonGroup :list-data="listData"
                              v-model="copySelectedData"
                              :reflect-key="reflectKey"
                              :active-style="activeStyle"
                              :normal-style="normalStyle"
                />
            </template>
            <template v-else>
                <CRadio v-for="(list, index) in listData"
                        v-model="copySelectedData"
                        :option="copySelectedData.find(v=>{
                               if(typeof v !== 'object'){
                                   return v === list
                               }
                               return v[reflectKey['value']] === list[reflectKey['value']]

                           }) || list"
                        :key="index"
                        :reflect-key="reflectKey"
                        :no-text="noText"
                />
            </template>
        </template>
        <slot v-else></slot>
    </span>
</template>

<script>
  import classNames from 'classnames';
  import _ from 'lodash';
  import {activeStyleProps, normalStyleProps, reflectKeyProps} from "../../consts/mixins";

  export default {
    name: 'CRadioGroup',
    mixins:[reflectKeyProps,normalStyleProps,activeStyleProps],
    props: {
      listData: {
        type: Array,
        default() {
          return []
        }
      },
      value: {
        type: Array,
        default() {
          return []
        }
      },
      type: {
        variable(value) {
          return value === 'button'
        },
        default() {
          return ''
        }
      },
      noText: {
        type: Boolean
      }
    },
    data() {
      return {
        copySelectedData: [],
        isDataModel: true
      };
    },
    mounted() {
      if (Object.keys(this.$slots).length) {
        this.isDataModel = false
      }
    },
    computed: {
      getWrapClass() {
        const prefix = this.prefix ? this.prefix + '-' : '';
        return classNames(
            {
              [`${prefix}radio-group-wrap`]: true
            }
        )
      }
    },
    watch: {
      value: {
        handler(v) {
          if (!_.isEqual(v, this.copySelectedData)) {
            this.$set(this, 'copySelectedData', v)
          }
        },
        deep: true,
        immediate: true
      },
      copySelectedData: {
        handler(v) {
          this.$emit('input', v)
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";

    .radio-wrap {
        .radio-item {
            display: inline-flex;

            &-fake-icon {
                border: 1px solid $darkLineColor;
                border-radius: 2px;
                display: inline-block;
                position: relative;
                box-shadow: 0 0 10px $lineColor;
                box-sizing: border-box;
                vertical-align: middle;

                &:hover {
                    box-shadow: 0 0 10px $primary;
                }
            }

            &-title {
                margin: 0 addPX($ssm-margin);
            }
        }
    }
</style>
