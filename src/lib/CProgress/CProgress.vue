<template>
    <div :class="getWrapClass">
        <div :class="getBgBoxClass"
             :style="getBgBoxStyle"
        >
            <div :class="getBarClass"
                 :style="getBarStyle"
            >
                <div :class="!this.status || this.status === 'progress'?'bounce-enter-active':''"
                     :style="getInnerStyle"></div>
            </div>
        </div>
        <span v-if="!noText" :style="getSpanText">{{value}}%</span>
    </div>
</template>

<script>
    import classNames from 'classnames'

    export default {
        name: 'CProgress',
        props: {
            value: {
                type: Number,
                default() {
                    return 0
                }
            },
            barConfig: {
                type: Object,
                default() {
                    return {
                        color: ['green', '#fff'],
                        deg: 45,
                        completeColor: '#1ac756',
                        errorColor: '#ff5e5c',
                        stopColor: '#ffbb50',
                    }
                }
            },
            height: {
                type: String,
                default() {
                    return '26'
                }
            },
            status: {
                type: String,
                validate(value) {
                    return !value || ['success', 'error', 'warning', 'process'].includes(value)
                }
            },
            timeSpan: {
                type: Number,
                default() {
                    return 10
                }
            },
            outside: {
                type: Boolean
            },
            color: {
                type: String,
                default(){
                    return '#888'
                }
            },
            // 不显示百分比
            noText: {
                type: Boolean
            }

        },
        data() {
            return {
                isShow: false,
            }
        },
        mounted() {
            this.isShow = true
        },
        computed: {
            getSpanText() {
                const {barConfig : bc} = this
                let color =  bc.color[0] || bc.color[1]
                color =  this.color || color
                if (this.status === 'complete') {
                    color = bc.completeColor
                }
                if (this.status === 'stop') {
                    color = bc.stopColor
                }
                if (this.status === 'error') {
                    color = bc.errorColor
                }
                if (this.height <= 10 || this.outside) {
                    return {
                        marginLeft: '8px',
                        color
                    }
                }
                return {
                    position: 'absolute',
                    left: '50%',
                    lineHeight: this.height + 'px',
                    color
                }
            },
            getInnerStyle() {
                const {barConfig: bc} = this
                let backgroundSize = ''
                let background = ''
                let animationDuration = ''
                if (bc.color.length) {
                    if (bc.color[0] && bc.color[1]) {
                        background = `linear-gradient(${bc.deg || 45}deg, ${bc.color[0]} 25%, ${bc.color[1]} 0%,${bc.color[1]} 50%,${bc.color[0]}
                0%,${bc.color[0]} 75%,${bc.color[1]} 0%)`
                        backgroundSize = `${Math.round(this.height / Math.tan(((bc.deg || 45) / 180) * 3.14))}px`
                        animationDuration = `${Math.ceil((this.timeSpan / 100) * this.value)}s`
                    } else {
                        background = bc.color[0] || bc.color[1]
                    }
                }
                if (this.status === 'complete') {
                    background = bc.completeColor
                }
                if (this.status === 'stop') {
                    background = bc.stopColor
                }
                if (this.status === 'error') {
                    background = bc.errorColor
                }
                return {
                    position: 'absolute',
                    top: '0',
                    left: '-100%',
                    width: '200%',
                    height: `${this.height}px`,
                    borderRadius: this.height / 2 + 'px',
                    background,
                    backgroundSize,
                    animationDuration,
                }
            },
            getBarStyle() {
                return {
                    width: this.value + '%',
                    height: this.height + 'px',
                    position: 'relative',
                    borderRadius: this.height / 2 + 'px',
                }
            },
            getBarClass() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames(
                    {
                        [`${prefix}progress-content`]: true
                    }
                )
            },
            getBgBoxStyle() {
                return {
                    height: this.height + 'px',
                    borderRadius: this.height / 2 + 'px',
                }
            },
            getBgBoxClass() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames(
                    {
                        [`${prefix}progress-bg-box`]: true
                    }
                )
            },
            getWrapClass() {
                const prefix = this.prefix ? this.prefix + '-' : ''
                return classNames(
                    {
                        [`${prefix}progress-wrap`]: true
                    }
                )
            }
        },
        methods: {},
        watch: {}
    }
</script>

<style lang="scss" scoped>
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";

    @keyframes move {
        from {
            left: -100%
        }
        to {
            left: 0
        }
    }

    .animation-enter {
        animation: move;
    }

    .progress {
        &-wrap {
            position: relative;
            display: flex;
            align-items: center;
        }

        &-bg-box {
            background: $maskBg;
            position: relative;
            display: flex;
            flex: 1;
        }

        &-content {
            height: 100%;
            overflow: hidden;
        }
    }

    .bounce-enter-active {
        animation: linear bounce-in 10s infinite;
    }

    @keyframes bounce-in {
        0% {
            left: -100%;
        }
        100% {
            left: 0;
        }
    }
</style>
