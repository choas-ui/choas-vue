<template>
    <span ref="promptWrap"
          :class="getPromptWrap"
          @click="showPrompt"
    >
        <slot></slot>
        <span ref="promptContent"
              :class="getContentClass"
              v-show="isPromptShow"
              :style="{
                  left: this.contentLeft,
                  top: this.contentTop
              }
        ">
            <span :style="arrowPos"/>
            <span>
                {{ dialog }}
            </span>
            <span :class="getBtnBox">
                <slot name="buttonBox">
                    <CButton size="ssmall" type="primary" @click="confirmHandle">确认</CButton>
                    <CButton size="ssmall" type="danger" @click="cancelHandle">取消</CButton>
                </slot>
            </span>
        </span>
    </span>
</template>

<script>
    import classNames from 'classnames'

    // 上三角位置
    const topPosition ={
        position: 'absolute',
        transform: 'rotateZ(45deg)',
        borderTop: '5px solid transparent',
        borderRight: '5px solid #fff',
        borderBottom: '5px solid #fff',
        borderLeft: '5px solid transparent',
        bottom: -5*Math.sqrt(2).toFixed(0) +'px',
        boxShadow: '2px 2px 3px #a0a0a0'
    }
    // 下三角位置
    const bottomPosition ={
        position: 'absolute',
        transform: 'rotateZ(45deg)',
        borderTop: '5px solid #fff',
        borderRight: '5px solid transparent',
        borderBottom: '5px solid transparent',
        borderLeft: '5px solid #fff',
        top: -5*Math.sqrt(2).toFixed(0) +'px',
        boxShadow: '-2px -2px 3px #a0a0a0'
    }
    // 方位列表
    const positionStr ={
        'top':'top',
        'right':'right',
        'bottom':'bottom',
        'left':'left',
        'center':'center',
    }

    export default {
        name: 'CPrompt',
        props: {
            dialog: {
                type: String,
                default() {
                    return ''
                }
            },
            placeSetting:{
              type: String,
              default(){
                  return 'left-bottom'
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
            }
        },
        data() {
            return {
                isPromptShow: true,
                contentLeft: 0,
                contentTop: 0,
                arrowPos: topPosition
            };
        },
        mounted() {
            this.$nextTick(() => {
                document.addEventListener('click', ({target}) => {
                    if (this.$refs.prompt && !this.$refs.prompt.contains(target)) {
                        this.isPromptShow = false
                    }
                })
            })

            const placeArr = this.placeSetting.split('-')
            const {promptWrap = {}, promptContent = {}}= this.$refs
            const topMoveDistance = promptWrap.offsetHeight+ promptContent.offsetHeight + 5*Math.sqrt(2).toFixed(0)+2
            const bottomMoveDistance = promptWrap.offsetHeight+2 + 5*Math.sqrt(2).toFixed(0)
            const leftMoveDistance = (promptWrap.offsetWidth/2 - promptContent.offsetWidth/2).toFixed(0)
            while (placeArr.length){
                const posStr = positionStr[placeArr[0]]
                if(posStr === 'top'){
                    promptContent.style.top = -topMoveDistance + 'px'
                    this.arrowPos = topPosition
                }
                if(posStr === 'right'){
                    promptContent.style.right = 0
                }
                if(posStr === 'bottom'){
                    promptContent.style.top = bottomMoveDistance + 'px'
                    this.arrowPos = bottomPosition
                }
                if(posStr === 'left'){
                    promptContent.style.left = 0
                }
                if(posStr === 'center'){
                    promptContent.style.left = leftMoveDistance + 'px'
                }
                placeArr.shift()
            }
            // 距离圆点的位置
            const top = promptContent.getBoundingClientRect().top
            const right = promptContent.getBoundingClientRect().right
            const bottom = promptContent.getBoundingClientRect().bottom
            const left = promptContent.getBoundingClientRect().left
            if(top<0){
                promptContent.style.top = bottomMoveDistance + 'px'
                this.arrowPos = bottomPosition
            }
            if(bottom - document.body.clientHeight>0){
                promptContent.style.top = -topMoveDistance + 'px'
                this.arrowPos = topPosition
            }
            if(left<0){
                promptContent.style.left= 0
            }
            if(right - document.body.clientWidth>0){
                promptContent.style.left= ''
                promptContent.style.right= 0
            }
            console.log(bottom,document.body.clientHeight)
        },
        computed: {
            getBtnBox(){
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
            confirmHandle() {
                this.$emit('confirm')
            },
            cancelHandle() {
                this.showPrompt(false)
                this.$emit('cancel')
            }
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
            &-btn-box{
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding-top: addPX($ssm-padding);
                >button{
                    &:nth-of-type(1){
                        margin-right: addPX($ssm-padding);
                    }
                    box-shadow: none;
                }
            }
        }
    }
</style>
