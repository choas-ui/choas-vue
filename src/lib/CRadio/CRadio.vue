<template>
    <span :class="getItemClass"
          @click="selectHandle"
    >
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
                         lineHeight:`${Math.round(height/1.4)}px`,
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
        name: 'CRadio',
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
            if (!this.isSimpleModel) {
                const index = this.checkedArr.findIndex(v => v[this.reflectKey['value']] === this.copyValue[this.reflectKey['value']])
                if (index > -1) {
                    if (!this.copyValue.checked) {
                        this.checkedArr.splice(index, 1)
                    }
                }
                if (index < 0) {
                    if (this.copyValue.checked) {
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
                        [`${prefix}radio-item-fake-icon`]: true
                    }
                )
            },
            getItemClass() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames(
                    {
                        [`${prefix}radio-item`]: true
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
                    if (!this.isSimpleModel && this.multiple) {
                        this.$set(this.copyValue, 'checked', false)
                        this.checkedArr.splice(index, 1)
                    }
                }
                if (index < 0) {
                    if (!this.isSimpleModel) {
                        this.$set(this.copyValue, 'checked', true)
                    }
                    this.$set(this, 'checkedArr', [this.copyValue])
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
                handler(v) {
                    if (!_.isEqual(v, this.checkedArr)) {
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
                    if (!this.isSimpleModel && typeof this.copyValue === 'object') {
                        if (this.copyValue[this.reflectKey['value']] !== (v[0] || {})[this.reflectKey['value']]) {
                            this.$set(this.copyValue, 'checked', false)
                        }
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
