<script>
    import classNames from 'classnames'
    // 默认图标
    const defaultIconName ={
        info: 'choas-fill-info',
        success: 'choas-fill-success',
        warning: 'choas-fill-warning',
        danger: 'choas-fill-danger',
    };
    // 默认颜色
    const defaultIconColor={
        info: '#0198de',
        success: '#159f45',
        warning: '#ffa10d',
        danger: '#ff1917',
    };

    export default {
        name: 'CMessage',
        props: {
            // 提示类型
            noticeType: {
                validate(v) {
                    return ['info', 'success', 'warning', 'danger'].indexOf(v) > 0
                },
                default() {
                    return 'info'
                }
            },
            message: {
                type: String,
                default() {
                    return ''
                }
            },
            txtColor: {
                type: String,
                default() {
                    return ''
                }
            },
            // 间隔
            timeSpan: {
                type: Number,
                default() {
                    return 2
                }
            },
            // 回调
            callback: {
                type: Function
            },
            // message标识
            id: {
                type: String,
                default() {
                    return ''
                }
            },
            // 图标
            iconName: {
                type: String,
                default() {
                    return ''
                }
            },
            // 图标
            fontClass: {
                type: String,
                default() {
                    return ''
                }
            },
            // 图标
            src: {
                type: String,
                default() {
                    return ''
                }
            },
            // 图标颜色
            iconColor: {
                type: String,
                default() {
                    return ''
                }
            },
            // 宽度
            widthPercent: {
                type: String,
                default() {
                    return '30';
                }
            },
            prefix: {
                type: String,
                default() {
                    return ''
                }
            },
        },
        data() {
            return {
                timer: null,
            }
        },
        computed: {
            getMessageWrapClass() {
                const prefix = this.prefix ? this.prefix + '-' : '';
                return classNames(
                    {
                        [prefix + 'message-wrap']: true,
                        [prefix + 'message-info']: this.noticeType === 'info',
                        [prefix + 'message-success']: this.noticeType === 'success',
                        [prefix + 'message-warning']: this.noticeType === 'warning',
                        [prefix + 'message-danger']: this.noticeType === 'danger',
                    }
                )
            },
        },
        methods: {
            removeHandle() {
                this.timer = setTimeout(() => {
                    this.$emit('changeListData', this.id);
                    this.callback && this.callback()
                }, this.timeSpan * 1000)
            }
        },
        mounted() {
            this.removeHandle()
        },
        render(h) {
            return h('transition',
                {
                    props: {
                        name: 'slide-fade'
                    }
                },
                [
                    h('div',
                        {
                            class: this.getMessageWrapClass,
                            style: {
                                width: this.widthPercent + 'vw',
                                marginLeft: `${(50 - this.widthPercent / 2).toFixed(0)}vw`,
                                maxWidth: '100vw',
                                color: this.txtColor || defaultIconColor[this.noticeType],
                            },
                            on: {
                                mouseenter: () => {
                                    clearTimeout(this.timer)
                                },
                                mouseleave: () => {
                                    this.removeHandle()
                                }
                            },
                        },
                        [
                            h('CIcon',
                                {
                                    props:{
                                        iconName: this.fontClass || this.src ||this.iconName || defaultIconName[this.noticeType],
                                        color: this.iconColor || defaultIconColor[this.noticeType]
                                    },
                                    style:{
                                        marginRight: '14px'
                                    }
                                }
                            ),
                            this.message
                        ]
                    )
                ]
            )
        }
    }
</script>
<style lang="scss" scoped>
    @import "../scss/functions";
    @import "../scss/size";
    @import "../scss/normal-bg";
    @import "../scss/variable";
    @import "../scss/comm-class";

    .message {
        &-wrap {
            padding: addPX($ssm-padding);
            box-sizing: border-box;
            border-radius: addPX($lg-radius);
            margin: addPX($sm-margin) 0;
            font-size: addPX($df-fs);
            word-break: break-all;
        }

        &-info {
            border: 1px solid scale-color($info, $lightness: -20%);
            background: scale-color($info, $lightness: +80%);
        }

        &-success {
            border: 1px solid scale-color($success, $lightness: -20%);
            background: scale-color($success, $lightness: +80%);
        }

        &-danger {
            border: 1px solid scale-color($danger, $lightness: -20%);
            background: scale-color($danger, $lightness: +80%);
        }

        &-warning {
            border: 1px solid scale-color($warning, $lightness: -20%);
            background: scale-color($warning, $lightness: +80%);
        }
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-leave-to {
        transform: translateY(-10px);
        opacity: 0;
    }
</style>
