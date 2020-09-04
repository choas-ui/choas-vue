<template>
    <span :class="getItemClass"
          @click="selectHandle"
    >
        <label style="display: none">
            <input type="radio" :value="option" v-model="checkedArr">
        </label>
                <span :class="getFakeIconClass"
                      :style="{
                        width: width +'px',
                        height: height +'px',
                        borderRadius: height+'px',
                        cursor: getDisabled?'not-allowed':'pointer'
                      }"
                >
                    <template v-if="getChecked">
                        <slot v-if="$slots['selected-icon']" name="selected-icon"></slot>
                        <span v-else
                              :style="{
                                position: 'absolute',
                                top: `${6/2-1}px`,
                                left: `${6/2-1}px`,
                                display: 'inline-block',
                                width:`${width/1 - 6}px`,
                                height:`${height/1 - 6}px`,
                                borderRadius: `${height/1 - 6}px`,
                                background: `radial-gradient(#1890ffee 40%, #1890ffcc 20%, #fff)`
                              }"
                        ></span>
                    </template>
                    <template v-else>
                        <slot v-if="getDisabled"
                              name="disabled-icon"
                        >
                            <CIcon :style="{
                                    position: 'absolute',
                                    top: `${6/2 - 1}px`,
                                    left: `${6/2 - 1}px`,
                                    display: 'inline-block',
                                    width:`${width/1 - 6}px`,
                                    height:`${height/1 - 6}px`,
                                    lineHeight:`${height/1 - 6}px`,
                                    borderRadius: '100%',
                                    background: `radial-gradient(#888 40%, #aaa 60%)`,
                                    zIndex: 9
                                }"
                                   key="disabled"
                                   icon-name="choas-close"
                                   color="#fff"
                            ></CIcon>
                        </slot>
                    </template>
                </span>
                <span class="radio-item-title"
                      :style="{
                         display: 'inline-block',
                         height:`${height}px`,
                         lineHeight:`${height}px`,
                      }"
                >
                    {{getKey}}
                </span>
            </span>
</template>

<script>
  import classNames from 'classnames';
  import _ from 'lodash';
  import {classNameProps, height18Props, prefixProps, reflectKeyProps, width18Props} from "../../consts/mixins";

  export default {
    name: 'CRadio',
    mixins: [reflectKeyProps, width18Props, height18Props, prefixProps, classNameProps],
    props: {
      option: {
        validate(v) {
          return typeof v === 'string' || typeof v === 'number' || typeof v === 'object'
        },
        default() {
          return ''
        }
      },
      disabled: {
        type: Boolean
      },
      noText: {
        type: Boolean
      },
      checkedData: {}
    },
    model: {
      prop: 'checkedData',
      event: 'checkedDataChange'
    },
    data() {
      return {
        checkedArr: [],
        isSimpleModel: true
      }
    },
    mounted() {
      if (!this.isSimpleModel) {
        const index = this.checkedArr.findIndex(v => v[this.reflectKey['value']] === this.option[this.reflectKey['value']]);
        if (index > -1) {
          if (!this.option.checked) {
            this.checkedArr.splice(index, 1)
          }
        }
        if (index < 0) {
          if (this.option.checked) {
            this.checkedArr.push(_.cloneDeep(this.option))
          }
        }
      }
    },
    computed: {
      getChecked() {
        if (this.isSimpleModel) {
          return this.checkedArr.includes(this.option)
        } else {
          return (this.checkedArr.find(v => v[this.reflectKey['value']] === this.option[this.reflectKey['value']]) || {}).checked
        }
      },
      getDisabled() {
        if (this.isSimpleModel) {
          return this.disabled
        } else {
          return (this.checkedArr.find(v => v[this.reflectKey['value']] === this.option[this.reflectKey['value']]) || {}).disabled
        }
      },
      getKey() {
        return this.isSimpleModel ? this.option : this.option[this.reflectKey['key']]
      },
      getFakeIconClass() {
        const prefix = this.prefix ? this.prefix + '-' : '';
        return classNames(
            {
              [`${prefix}radio-item-fake-icon`]: true
            }
        )
      },
      getItemClass() {
        const prefix = this.prefix ? this.prefix + '-' : '';
        return classNames(
            {
              [`${prefix}radio-item`]: true
            }
        )
      }
    },
    methods: {
      selectHandle() {
        if (this.isSimpleModel ? this.disabled : this.option.disabled) {
          return
        }
        let index = -1;
        if (this.isSimpleModel) {
          index = this.checkedArr.findIndex(v => v === this.option)
        } else {
          index = this.checkedArr.findIndex(v => v[this.reflectKey['value']] === this.option[this.reflectKey['value']])
        }
        if (index > -1) {
          if (!this.isSimpleModel && this.multiple) {
            this.$set(this.checkedArr[index], 'checked', false)
          } else {
            this.checkedArr.splice(index, 1)
          }
        }
        if (index < 0) {
          this.$set(this, 'checkedArr', [_.cloneDeep(this.option)]);
          if (!this.isSimpleModel) {
            this.$set(this.checkedArr[0], 'checked', true)
          }
        }
      }
    },
    watch: {
      option: {
        handler(v) {
          this.isSimpleModel = ['string', 'number'].includes(typeof v)
        },
        deep: true,
        immediate: true
      },
      checkedData: {
        handler(v) {
          if (v && !_.isEqual(v, this.checkedArr)) {
            this.$set(this, 'checkedArr', v)
          }
        },
        deep: true,
        immediate: true
      },
      checkedArr: {
        handler(v) {
          if (!_.isEqual(v, this.checkedData)) {
            this.$emit('checkedDataChange', v)
          }
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";

    .radio-item {
        ::selection {
            background: none;
        }

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
</style>
