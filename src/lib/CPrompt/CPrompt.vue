<script>
    import classNames from 'classnames'

    // 方位列表
    const positionStr = {
        'top': 'top',
        'right': 'right',
        'bottom': 'bottom',
        'left': 'left',
        'center': 'center',
    }

    export default {
        name: 'CPrompt',
        props: {
            // 对话字符串
            dialog: {
                type: String,
                default() {
                    return ''
                }
            },
            // 函数生成对话
            renderDialog: {
                type: Function
            },
            placeSetting: {
                type: String,
                default() {
                    return 'top-left'
                }
            },
            className: {
                type: String,
                default() {
                    return ''
                }
            },
            prefix: {
                type: String,
                default() {
                    return ''
                }
            },
            // 禁止自动调整位置
            noAutoSetting:{
                type: Boolean
            },
            // 确认文字
            confirmTxt:{
                type: String,
                default(){
                    return '确认'
                }
            },
            // 取消文字
            cancelTxt:{
                type: String,
                default(){
                    return '取消'
                }
            }
        },
        data() {
            return {
                isPromptShow: false,
                arrowPos: {},
                copyPlaceSetting: this.placeSetting
            };
        },
        mounted() {
            this.$nextTick(() => {
                document.addEventListener('click', ({target}) => {
                    if (this.$refs.promptWrap && !this.$refs.promptWrap.contains(target)) {
                        this.isPromptShow = false
                    }
                })
            })
        },
        computed: {
            getBtnBox() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames(
                    {
                        [prefix + 'prompt-content-btn-box']: true
                    }
                )
            },
            getContentClass() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames(
                    {
                        [prefix + 'prompt-content']: true
                    }
                )
            },
            getPromptWrap() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames(
                    this.className,
                    {
                        [prefix + 'prompt-wrap']: true
                    }
                )
            }
        },
        methods: {
            showPrompt(show) {
                this.isPromptShow = show
            },
            confirmHandle(e) {
                e.stopPropagation();
                this.showPrompt(false)
                this.$emit('confirm')
            },
            cancelHandle(e) {
                e.stopPropagation();
                this.showPrompt(false)
                this.$emit('cancel')
            },
            setContentStyle() {
                const sqrt2 = Math.sqrt(2)
                setTimeout(() => {
                    const placeArr = this.copyPlaceSetting.split('-')
                    const {promptWrap ={}, promptContent = {}} = this.$refs
                    const topMoveDistance = promptWrap.offsetHeight + promptContent.offsetHeight
                    const bottomMoveDistance = (promptWrap.offsetHeight + 10 * sqrt2).toFixed(0)
                    const leftMoveDistance = (promptWrap.offsetWidth / 2 - promptContent.offsetWidth / 2).toFixed(0)
                    this.arrowPos = {
                        position: 'absolute',
                        zIndex: 1000,
                        transform: 'rotateZ(45deg)',
                    }
                    while (placeArr.length) {
                        const posStr = positionStr[placeArr[0]]
                        if (posStr === 'top') {
                            promptContent.style.top = -topMoveDistance + 'px'
                            this.arrowPos = {
                                ...this.arrowPos,
                                borderTop: '5px solid transparent',
                                borderRight: '5px solid #fff',
                                borderBottom: '5px solid #fff',
                                borderLeft: '5px solid transparent',
                                boxShadow: '2px 2px 3px #a0a0a0',
                                bottom: -(5 * sqrt2 / 2).toFixed(0) + 'px',
                            }
                        }
                        if (posStr === 'bottom') {
                            promptContent.style.top = bottomMoveDistance + 'px'
                            this.arrowPos = {
                                ...this.arrowPos,
                                top: -(5 * sqrt2 / 2).toFixed(0) + 'px',
                                boxShadow: '-2px -2px 3px #a0a0a0',
                                borderTop: '5px solid #fff',
                                borderRight: '5px solid transparent',
                                borderBottom: '5px solid transparent',
                                borderLeft: '5px solid #fff',
                            }
                        }
                        if (posStr === 'left') {
                            this.arrowPos = {
                                ...this.arrowPos,
                                left: (promptWrap.offsetWidth / 2 - 5 * sqrt2 / 2).toFixed(0) + 'px',
                                right: ''
                            }
                            promptContent.style.right = ''
                            promptContent.style.left = 0
                        }
                        if (posStr === 'right') {
                            this.arrowPos = {
                                ...this.arrowPos,
                                left: '',
                                right: (promptWrap.offsetWidth / 2 - 5 * sqrt2 / 2).toFixed(0) + 'px',
                            }
                            promptContent.style.left = ''
                            promptContent.style.right = 0
                        }
                        if (posStr === 'center') {
                            this.arrowPos = {
                                ...this.arrowPos,
                                left: (promptContent.clientWidth/2 -5*sqrt2).toFixed(0) + 'px',
                                right: ''
                            }
                            promptContent.style.right = ''
                            promptContent.style.left = leftMoveDistance + 'px'
                        }
                        placeArr.shift()
                    }
                    this.$set(this, 'arrowPos', this.arrowPos)

                    if(this.noAutoSetting){
                        return
                    }
                    // 根据位置重置异常位置
                    // 距离圆点的位置
                    const top = promptContent.getBoundingClientRect().top
                    const right = promptContent.getBoundingClientRect().right
                    const bottom = promptContent.getBoundingClientRect().bottom
                    const left = promptContent.getBoundingClientRect().left
                    const clientWidth = document.documentElement.clientWidth || document.body.clientWidth
                    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
                    if (top < 0) {
                        this.copyPlaceSetting = this.copyPlaceSetting.replace('top', 'bottom')
                    }
                    if (bottom > clientHeight) {
                        this.copyPlaceSetting = this.copyPlaceSetting.replace('bottom', 'top')
                    }
                    if (left < 0) {
                        this.copyPlaceSetting = this.copyPlaceSetting.replace('right', 'left')
                        this.copyPlaceSetting = this.copyPlaceSetting.replace('center', 'left')
                    }
                    if (right > clientWidth) {
                        this.copyPlaceSetting = this.copyPlaceSetting.replace('left', 'right')
                        this.copyPlaceSetting = this.copyPlaceSetting.replace('center', 'right')
                    }
                })
            }
        },
        watch: {
            isPromptShow(v) {
                if (v) {
                    this.setContentStyle()
                }
            },
            copyPlaceSetting() {
                this.setContentStyle()
            }

        },
        render(h) {
            return h(
                'span',
                {
                    ref: 'promptWrap',
                    class: this.getPromptWrap,
                    on: {
                        click: () => {
                            this.showPrompt(true)
                        }
                    }
                },
                [
                    ...this.$slots.default,
                    h('span',
                        {
                            ref: 'promptContent',
                            class: this.getContentClass,
                            style:{
                                display: this.isPromptShow ? 'inline': 'none'
                            }
                        },
                        [
                            h('span',
                                {
                                    style: this.arrowPos
                                },
                            ),
                            h('span',
                                [typeof this.renderDialog ==='function' ? this.renderDialog(h): this.dialog]
                            ),
                            h('span',
                                {
                                    class: this.getBtnBox
                                },
                                [
                                    this.$listeners.confirm && h('CButton',
                                        {
                                            props: {
                                                type: 'primary',
                                                size: 'ssmall'
                                            },
                                            on:{
                                                click:this.confirmHandle
                                            }
                                        },
                                        [this.confirmTxt]
                                    ),
                                    this.$listeners.cancel && h('CButton',
                                        {
                                            props: {
                                                type: 'danger',
                                                size: 'ssmall'
                                            },
                                            on:{
                                                click:this.cancelHandle
                                            }
                                        },
                                        [this.cancelTxt]
                                    )
                                ]
                            )
                        ]
                    )
                ]
            )
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";

    .prompt {
        &-wrap {
            position: relative;
        }

        &-content {
            position: absolute;
            min-width: 200px;
            box-shadow: 0 0 5px $shadowCr;
            border-radius: addPX($df-radius);
            padding: addPX($ssm-padding);
            background: #fff;
            z-index: 999;

            &-btn-box {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding-top: addPX($ssm-padding);

                > button {
                    &:nth-of-type(1) {
                        margin-right: addPX($ssm-padding);
                    }

                    box-shadow: none;
                }
            }
        }
    }
</style>
