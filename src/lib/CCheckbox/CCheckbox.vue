<template>
    <span :class="getItemClass"
          @click="selectHandle"
    >
        <span :class="getFakeIconClass"
              :style="{
                width: width +'px',
                height: height +'px',
                cursor: getDisabled?'not-allowed':'pointer'
              }"
        >
            <template v-if="getChecked">
                <slot v-if="$slots['selected-icon']" name="selected-icon"></slot>
                <CIcon v-else icon-name="choas-selected"
                       key="selected"
                       color="#006ab3"
                       :width="`${width/1 + 8}`"
                       :height="`${height/1 + 8}`"
                       :style="{
                         position: 'absolute',
                         top: `-${8/2}px`,
                         left: `-${8/2}px`,
                         zIndex:10
                     }"
                />
            </template>
            <template v-else>
                        <slot v-if="getDisabled"
                              name="disabled-icon"
                        >
                            <CIcon :style="{
                                    position: 'absolute',
                                    top: `-1px`,
                                    left: `-1px`,
                                    display: 'inline-block',
                                    background: `radial-gradient(#888 40%, #aaa 60%)`,
                                    zIndex: 9
                                }"
                                   key="disabled"
                                   icon-name="choas-close"
                                   color="#fff"
                            ></CIcon>
                        </slot>
                        <template v-else>
                            <slot v-if="getHalfChecked"
                                  name="half-checked-icon"
                            >
                                <span :style="{
                                        position: 'absolute',
                                        top: `${4/2-1}px`,
                                        left: `${4/2-1}px`,
                                        display: 'inline-block',
                                        width:`${width/1 - 4}px`,
                                        height:`${height/1 - 4}px`,
                                        background: `radial-gradient(#1890ffee 40%, #1890ffcc 20%, #fff)`
                                    }"
                                ></span>
                            </slot>
                        </template>
                    </template>
        </span>
        <span v-if="!noText"
              class="checkbox-item-title"
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
    import classNames from 'classnames'
    import _ from 'lodash'

    export default {
        name: 'CCheckbox',
        props: {
            checkedData: {
                type: Array,
                default() {
                    return []
                }
            },
            value: {
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
            halfChecked: {
                type: Boolean
            },
            reflectKey: {
                type: Object,
                default() {
                    return {
                        key: 'key',
                        value: 'value'
                    }
                }
            },
            width: {
                type: String,
                default() {
                    return '18'
                }
            },
            height: {
                type: String,
                default() {
                    return '18'
                }
            },
            prefix: {
                type: String,
                default() {
                    return ''
                }
            },
            classNames: {
                type: String,
                default() {
                    return ''
                }
            },
            noText:{
                type: Boolean
            }
        },
        model: {
            prop: 'checkedData',
            event: 'checkedDataChange'
        },
        data() {
            return {
                checkedArr: [],
                copyValue: '',
                isSimpleModel: true
            }
        },
        mounted() {
            this.$set(this, 'copyValue', _.cloneDeep(this.value))
            if(!this.isSimpleModel){
                const index = this.checkedArr.findIndex(v => v[this.reflectKey['value']] === this.copyValue[this.reflectKey['value']])
                if(index>-1){
                    if(!this.copyValue.checked){
                        this.checkedArr.splice(index,1)
                    }
                }
                if(index<0){
                    if(this.copyValue.checked){
                        this.checkedArr.push(this.copyValue)
                    }
                }
            }
        },
        computed: {
            getChecked() {
                if (this.isSimpleModel) {
                    return this.checkedArr.includes(this.copyValue)
                } else {
                    return this.copyValue.checked
                }
            },
            getDisabled() {
                return this.isSimpleModel ? this.disabled : this.copyValue.disabled
            },
            getHalfChecked() {
                return this.isSimpleModel ? this.halfChecked : this.copyValue.halfChecked
            },
            getKey() {
                return this.isSimpleModel ? this.copyValue : this.copyValue[this.reflectKey['key']]
            },
            getValueTxt() {
                return this.isSimpleModel ? this.copyValue : this.copyValue[this.reflectKey['value']]
            },
            getFakeIconClass() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames(
                    {
                        [`${prefix}checkbox-item-fake-icon`]: true
                    }
                )
            },
            getItemClass() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames(
                    {
                        [`${prefix}checkbox-item`]: true
                    }
                )
            }
        },
        methods: {
            selectHandle() {
                if (this.getDisabled) {
                    return
                }
                let index = -1;
                if (this.isSimpleModel) {
                    index = this.checkedArr.findIndex(v => v === this.copyValue)
                } else {
                    index = this.checkedArr.findIndex(v => v[this.reflectKey['value']] === this.copyValue[this.reflectKey['value']])
                }
                if (index > -1) {
                    if (!this.isSimpleModel) {
                        this.$set(this.copyValue, 'checked', false)
                    }
                    this.checkedArr.splice(index, 1)
                }
                if (index < 0) {
                    if (!this.isSimpleModel) {
                        this.$set(this.copyValue, 'checked', true)
                        this.$set(this.copyValue, 'halfChecked', false)
                    }
                    this.checkedArr.push(this.copyValue)
                }
            }
        },
        watch: {
            value: {
                handler(v) {
                    this.isSimpleModel = ['string', 'number'].includes(typeof v)
                },
                deep: true,
                immediate: true
            },
            checkedData: {
                handler(v, old) {
                    if(!_.isEqual(v, old)){
                        this.$set(this, 'checkedArr', v)
                    }
                },
                deep: true,
                immediate: true
            },
            checkedArr: {
                handler(v, old) {
                    if(!_.isEqual(v, old)){
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

    .checkbox-item {
        ::selection {
            background: none;
        }

        display: inline-flex;
        align-items: center;

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
