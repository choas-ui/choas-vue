<script>
    import classNames from 'classnames'
    import _ from 'lodash'

    const paddingNum = {
        llarge: 32,
        large: 26,
        default: 20,
        small: 14,
        ssmall: 8,
    };

    export default {
        name: 'CInput',
        props: {
            value: {},
            // 高度
            size: {
                validate(v) {
                    return !v || ['ssmall', 'small', 'default', 'large', 'llarge'].includes(v)
                },
                default() {
                    return 'default'
                }
            },
            width: {
                type: String,
                default() {
                    return ''
                }
            },
            // 提示
            placeholder: {
                type: String,
                default() {
                    return ''
                }
            },
            // 列表
            listData: {
                type: Array,
                default() {
                    return [];
                }
            },
            // 列表映射
            reflectKey: {
                type: Object,
                default() {
                    return {
                        key: 'key',
                        value: 'value'
                    };
                }
            },
            // 输入框类型
            type: {
                validate(v) {
                    return ['text', 'password', 'number', 'search'].includes(v)
                },
                default() {
                    return 'text'
                }
            },
            maxLength:{
                validate(v){
                    return typeof  v  === "number" && v >=0
                }
            },
            min: {
                type: Number,
            },
            max: {
                type: Number
            },
            correctionTimeSpan:{
                type: Number,
                default(){
                    return 1
                }
            },
            // 是否显示清除按钮
            clearable: {
                type: Boolean
            },
            passwordReplacer: {
                type: String,
                default() {
                    return '&bull;'
                }
            },
            // 类名
            className: {
                type: String,
                default() {
                    return ''
                }
            },
            // 前缀名
            prefix: {
                type: String,
                default() {
                    return ''
                }
            },
            // 不显示searchBtn
            noSearchBtn: {
                type: Boolean
            },
            // 生成自定义搜索按钮
            renderSearchBtn: {
                type: Function
            }
        },
        model: {
            prop: 'value',
            event: 'changeValue'
        },
        data() {
            return {
                inputFocus: false,
                inputValue: '',
                canPasswordSee: false,
                timer: null
            };
        },
        mounted() {
            const obj = this.$refs.div;
            if (obj) {
                // 禁止复制富文本
                obj.addEventListener('paste', e => {
                    // 阻止默认的复制事件
                    e.preventDefault();
                    // 获取页面文本选区
                    let txt = e.clipboardData.getData('text/plain');
                    // 获取复制的文本
                    let range = window.getSelection().getRangeAt(0);
                    // 删除默认选中文本
                    range.deleteContents();
                    // 插入文本节点
                    if ( ['text', 'search'].includes(this.type)) {
                        this.inputValue = txt;
                        if(this.maxLength !==undefined && this.inputValue.length>this.maxLength){
                            this.inputValue =this.inputValue.toString().slice(0, this.maxLength)
                        }
                    }
                    // 插入文本节点
                    if (this.type === 'number') {
                        this.inputValue = parseFloat(txt);
                        if (Number.isNaN(this.inputValue)) {
                            this.inputValue = this.min
                        } else {
                            if (this.max !== undefined && this.inputValue > this.max) {
                                this.inputValue = this.max
                            }
                            if (this.min !== undefined && this.inputValue < this.min) {
                                this.inputValue = this.min
                            }
                        }
                    }
                    range.insertNode(document.createTextNode(this.inputValue));
                    // 将焦点移动到复制文本结尾
                    range.collapse(false);
                });
                // 设置密码样式
                this.setInputDomValue(obj)
            }
        },
        computed: {
            getClearableStyle() {
                return {
                    top: `calc(50% - 8px)`,
                    right: (paddingNum[this.size || 'default'] / 2).toFixed() + 'px',
                }
            },
            // 清除按钮的类
            getClearableClass() {
                const prefix = this.prefix ? this.prefix + '-' : '';
                return classNames({
                    [prefix + 'input-clearable']: true
                })
            },
            // 提示
            getPlaceholderStyle() {
                if (this.$slots['prefix-icon']) {
                    const {propsData: {width: prefixWidth}} = this.$slots['prefix-icon'][0].componentOptions;
                    return {
                        position: 'absolute',
                        left: prefixWidth / 1 + 4 + 'px',
                        top: 0,
                        color: '#aaa'
                    }
                }
                return {
                    position: 'absolute',
                    left: (paddingNum[this.size || 'default'] / 2).toFixed() + 'px',
                    top: 0,
                    color: '#aaa'
                }
            },
            getContentStyle() {
                let marginRight = 0;
                if (this.clearable || this.type === 'password' || this.type === 'password') {
                    marginRight = 18 + 'px'
                }
                if (this.$slots['behind-icon']) {
                    const {propsData: {width: behindWidth}} = this.$slots['behind-icon'][0].componentOptions;
                    marginRight = behindWidth + 'px'
                }
                return {
                    outerLine: 'none',
                    marginRight
                }
            },
            // input外框样式
            getInputStyle() {
                // 默认值
                let padding = `0 ${(paddingNum[this.size || 'default'] / 2).toFixed()}px`;
                if (this.$slots['prefix-icon'] && this.$slots['behind-icon']) {
                    const {propsData: {width: prefixWidth}} = this.$slots['prefix-icon'][0].componentOptions;
                    const {propsData: {width: behindWidth}} = this.$slots['behind-icon'][0].componentOptions;
                    padding = `0 ${behindWidth / 1 + 4}px 0 ${prefixWidth / 1 + 2}px`;
                }
                if (this.$slots['prefix-icon'] && !this.$slots['behind-icon']) {
                    const {propsData: {width: prefixWidth}} = this.$slots['prefix-icon'][0].componentOptions;
                    padding = `0 ${(paddingNum[this.size || 'default'] / 2).toFixed()}px 0 ${prefixWidth / 1 + 4}px`;
                }
                if (!this.$slots['prefix-icon'] && this.$slots['behind-icon']) {
                    const {propsData: {width: behindWidth}} = this.$slots['behind-icon'][0].componentOptions;
                    padding = `0 ${(behindWidth / 2).toFixed()}px 0 ${(paddingNum[this.size || 'default'] / 2).toFixed()}px`;
                }
                return {
                    border: `1px solid ${this.inputFocus ? "#1890ff" : "#aaa"}`,
                    position: 'relative',
                    padding,
                    borderBottomRightRadius: this.type === 'search' && !this.noSearchBtn ? 0 : null,
                    borderTopRightRadius: this.type === 'search' && !this.noSearchBtn ? 0 : null,
                }
            },
            // input外框类
            getInputClass() {
                const prefix = this.prefix ? this.prefix + '-' : '';
                return classNames(
                    {
                        [prefix + 'input-llarge']: this.size === 'llarge',
                        [prefix + 'input-large']: this.size === 'large',
                        [prefix + 'input-default']: this.size === 'default',
                        [prefix + 'input-small']: this.size === 'small',
                        [prefix + 'input-ssmall']: this.size === 'ssmall',
                        [prefix + 'input']: true,
                    }
                )
            },
            getInputWrapStyle() {
                return {
                    width: this.width ? this.width + 'px' : '100%',
                }
            },
            // 组件外壳
            getInputWrapClass() {
                const prefix = this.prefix ? this.prefix + '-' : '';
                return classNames(
                    {
                        [prefix + 'input-wrap']: true
                    }
                )
            }
        },
        methods: {
            // 输入
            inputHandle(e) {
                if(this.timer){
                    clearTimeout(this.timer)
                }
                const obj = this.$refs.div;
                if (e.inputType === 'insertCompositionText') {
                    return
                }
                if (e.inputType === 'insertParagraph') {
                    // 回车键时阻止创建新的一行
                }
                if (e.inputType === 'deleteContentBackward') {
                    // TODO 后续需要测试ie浏览器兼容性问题
                    const {anchorOffset: slicePos} = window.getSelection ?
                        window.getSelection() : document.selection.createRange();
                    // 防止副文本删除导致的光标上移问题
                    this.inputValue = slicePos ? this.inputValue.toString().slice(0, slicePos) : '';
                }
                if (e.inputType === 'insertText') {
                    if (this.type !== 'number') {
                        this.inputValue += e.data;
                        if(this.maxLength !==undefined && this.inputValue.length>this.maxLength){
                            this.inputValue =this.inputValue.toString().slice(0, this.maxLength)
                        }
                    } else {
                        // 无穷大值修正
                        if(this.inputValue=== Infinity){
                            this.inputValue = this.max
                        }
                        // 无穷小值修正
                        if(this.inputValue=== -Infinity){
                            this.inputValue = this.min
                        }
                        if (/[0-9]/.test(e.data)) {
                            if(parseFloat(this.inputValue) === 0){
                                this.inputValue = e.data
                            }else{
                                this.inputValue += e.data
                            }
                        } else {
                            //
                            if (e.data === '-') {
                                if (this.inputValue === undefined || this.inputValue === '') {
                                    this.inputValue = e.data
                                }

                            }
                            if (e.data === '.') {
                                const value = this.inputValue + e.data;
                                if (!Number.isNaN(parseFloat(value)) && !this.inputValue.includes('.')) {
                                    this.inputValue = value
                                }
                            }
                        }
                    }

                }
                this.setInputDomValue(obj);
                this.setEndTextPos(obj);
                // 校正
                if(this.type === 'number'&& (this.max!== undefined || this.min!==undefined)){
                    this.timer = setTimeout(()=>{
                        if (this.max !== undefined && this.inputValue >= this.max) {
                            this.inputValue = this.max
                        }
                        if (this.min !== undefined && this.inputValue <= this.min) {
                            this.inputValue = this.min
                        }
                        this.setInputDomValue(obj);
                        this.setEndTextPos(obj);
                    },this.correctionTimeSpan * 1000);
                }
                if (this.value !== this.inputValue) {
                    // 触发input事件
                    this.$emit('input', this.inputValue)
                }

            },
            // 中文输入
            changeHandleEnd(e) {
                const obj = this.$refs.div;
                if (this.type === 'text') {
                    this.inputValue += e.data;
                } else {
                    this.setInputDomValue(obj);
                    this.setEndTextPos(obj)
                }
            },
            // 焦点
            focusHandle() {
                // 设置焦点
                this.inputFocus = true;
                let obj = this.$refs.div;
                this.setEndTextPos(obj)
            },
            // 失焦
            blurHandle() {
                // 取消焦点
                this.inputFocus = false;
                // 触发change事件
                if (this.value !== this.inputValue) {
                    this.$emit('change', this.inputValue)
                }
            },
            // 清除
            clearHandle() {
                let obj = this.$refs.div;
                this.inputValue = '';
                obj.innerHTML = '&#8203';
                this.setEndTextPos(obj)
            },
            // 设置值
            setInputDomValue(obj) {
                if (this.inputValue !== undefined) {
                    if (this.type === 'text') {
                        obj.innerHTML = this.inputValue
                    }
                    if (this.type === 'number') {
                        obj.innerHTML = this.inputValue
                    }
                    if (this.type === 'password') {
                        obj.innerHTML = this.inputValue.replace(/./ig, this.passwordReplacer)
                    }
                } else {
                    obj.innerHTML = "&#8203";

                }
            },
            // 查看密码
            seePasswordHandle() {
                let timer = 0;
                if (this.canPasswordSee) {
                    this.canPasswordSee = false
                } else {
                    this.canPasswordSee = true;
                    timer && clearInterval(timer);
                    timer = setTimeout(() => {
                        this.canPasswordSee = false
                    }, 2000)
                }
            },
            // 设置光标位置
            setEndTextPos(obj) {
                // 解决浏览器的兼容问题，做如下条件判断
                if (window.getSelection) {
                    obj.focus();
                    let range = window.getSelection();
                    range.selectAllChildren(obj);
                    range.collapseToEnd();//光标移至最后
                } else if (document.selection) {
                    let range = document.selection.createRange();
                    range.moveToElementText(obj);
                    range.collapse(false);//光标移至最后
                    range.select();
                }
            },
            // 前置图标
            createPrefixIcon(h) {
                if (!this.$slots['prefix-icon']) {
                    return null
                }
                const {propsData, propsData: {height}, listeners} = this.$slots['prefix-icon'][0].componentOptions;
                return h('CIcon',
                    {
                        props: propsData,
                        style: {
                            position: 'absolute',
                            left: '2px',
                            top: `calc(50% - ${(height / 2).toFixed(0)}px)`
                        },
                        on: listeners
                    },
                )
            },
            // 输入盒
            createEditableBox(h) {
                return h('div',
                    {
                        style: this.getContentStyle,
                        ref: 'div',
                        props: {
                            placeholder: this.placeholder,
                            contenteditable: true
                        },
                        domProps: {},
                        attrs: {
                            contenteditable: true,
                        },
                        on: {
                            input: (e) => {
                                this.inputHandle(e)
                            },
                            compositionend: (e) => {
                                this.changeHandleEnd(e)
                            },
                            focus: (e) => {
                                this.focusHandle(e)
                            },
                            blur: (e) => {
                                this.blurHandle(e)
                            },

                        }
                    },
                )
            },
            // 后置图标
            createBehindIcon(h) {
                if (this.type === 'password') {
                    return h('CIcon',
                        {
                            props: {
                                iconName: this.canPasswordSee ? 'choas-close-eye' : 'choas-eye',
                                color: '#aaa'
                            },
                            class: this.getClearableClass,
                            style: this.getClearableStyle,
                            on: {
                                click: (e) => {
                                    this.seePasswordHandle(e);
                                }
                            }
                        })
                }
                if (this.type === 'number') {
                    let width = (paddingNum[this.size || 'default'] * 0.6).toFixed();
                    let height = (paddingNum[this.size || 'default'] * 0.6).toFixed();
                    width = width > 8 ? width : '8';
                    height = height > 8 ? height : '8';
                    return [
                        h('CIcon',
                            {
                                props: {
                                    iconName: 'choas-add',
                                    width,
                                    height,
                                },
                                style: {
                                    position: 'absolute',
                                    right: `${paddingNum[this.size || 'default'] / 2}px`,
                                    top: `calc(50% - ${height / 1 + 1}px)`,
                                    background: '#eee'
                                },
                                on: {
                                    click: () => {
                                        const obj = this.$refs.div;
                                        this.inputValue = this.inputValue / 1 + 1;
                                        if (this.max !== undefined && this.inputValue >= this.max) {
                                            this.inputValue = this.max
                                        }
                                        this.setInputDomValue(obj);
                                        this.setEndTextPos(obj);
                                    }
                                },
                            }
                        ),
                        h('CIcon',
                            {
                                props: {
                                    iconName: 'choas-min',
                                    width,
                                    height,
                                },
                                style: {
                                    position: 'absolute',
                                    right: `${paddingNum[this.size || 'default'] / 2}px`,
                                    bottom: `calc(50% - ${height / 1 + 1}px)`,
                                    background: '#eee'
                                },
                                on: {
                                    click: () => {
                                        const obj = this.$refs.div;
                                        this.inputValue = this.inputValue / 1 - 1;
                                        if (this.min !== undefined && this.inputValue <= this.min) {
                                            this.inputValue = this.min
                                        }
                                        this.setInputDomValue(obj);
                                        this.setEndTextPos(obj);
                                    }
                                },
                            }
                        )
                    ]
                }
                if (!this.$slots['behind-icon']) {
                    return null
                }
                const {propsData, propsData: {height}, listeners} = this.$slots['behind-icon'][0].componentOptions;
                return h('CIcon',
                    {
                        props: propsData,
                        style: {
                            position: 'absolute',
                            right: `${paddingNum[this.size || 'default'] / 2}px`,
                            top: `calc(50% - ${(height / 2).toFixed(0)}px)`
                        },
                        on: listeners
                    },
                )
            },
            createSearchBtn(h){
                if(this.type!== 'search'){
                    return  null
                }
                if(this.type === 'search' && this.noSearchBtn){
                    return null
                }
                if(typeof this.renderSearchBtn === 'function'){
                    return this.renderSearchBtn(h);
                }
                return h('CButton',
                    {
                        props: {
                            size: this.size
                        },
                        style: {
                            borderBottomLeftRadius: !this.noSearchBtn ? 0 : null,
                            borderTopLeftRadius: !this.noSearchBtn ? 0 : null,
                            display: 'inline-flex'
                        },
                        on: {
                            click: () => {
                                alert('search')
                            }
                        }
                    },
                    [
                        h('CIcon',
                            {
                                slot: 'left',
                                props: {
                                    iconName: 'choas-search',
                                    color: '#fff',
                                }
                            }
                        ),
                        '搜 索'
                    ]
                )
            }
        },
        watch: {
            value: {
                handler(v) {
                    // 初始化值
                    if (typeof v === 'undefined') {
                        this.inputValue = ""
                    } else {
                        this.inputValue = v
                    }
                },
                immediate: true
            },
            // 内部维护值
            inputValue: {
                handler(v) {
                    if (!_.isEqual(v, this.value)) {
                        const emitValue = this.type === 'number' ? Number.isNaN(parseFloat(v))? '': parseFloat(v) : v;
                        this.$emit('input', emitValue)
                    }
                },
                immediate: true
            },
            // 监听密码是否可见 修改内容区
            canPasswordSee: {
                handler(v) {
                    const obj = this.$refs.div;
                    if (obj) {
                        if (v) {
                            obj.innerHTML = this.inputValue
                        } else {
                            this.setInputDomValue(obj)
                        }
                        this.setEndTextPos(obj)
                    }
                },
                immediate: true
            }

        },
        render(h) {
            return h('div',
                {
                    class: this.getInputWrapClass,
                    style: this.getInputWrapStyle,
                },
                [
                    h('label',
                        {
                            style: {
                                display: 'none'
                            }
                        },
                        [
                            h('input',
                                {
                                    props: {
                                        type: this.type
                                    },
                                    domProps: {
                                        value: this.inputValue
                                    }
                                }
                            )
                        ]
                    ),
                    h('div',
                        {
                            class: this.getInputClass,
                            style: this.getInputStyle,
                        },
                        [
                            // 前置图标
                            this.createPrefixIcon(h),
                            // 输入盒
                            this.createEditableBox(h),
                            // 输入提示
                            this.inputValue === undefined || this.inputValue === '' ? h('span', {
                                    style: this.getPlaceholderStyle,
                                    on: {
                                        click: (e) => {
                                            this.focusHandle(e);
                                        }
                                    }
                                },
                                [this.placeholder]
                            ) : null,
                            // 清除输入按钮 仅仅在文本模式显示
                            this.clearable && this.type === 'text' &&
                            this.type !== 'number' &&
                            !this.$slots['behind-icon'] &&
                            h('CIcon',
                                {
                                    props: {
                                        iconName: 'choas-fill-danger',
                                        color: '#aaa'
                                    },
                                    class: this.getClearableClass,
                                    style: this.getClearableStyle,
                                    on: {
                                        click: (e) => {
                                            this.clearHandle(e);
                                        }
                                    }
                                }),
                            // 后置图标
                            this.createBehindIcon(h),
                        ]
                    ),
                    this.createSearchBtn(h)
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

    .input-wrap {
        display: inline-flex;
    }

    .input {
        border: 1px solid $lineColor;
        outline: none;
        box-sizing: border-box;
        width: 100%;
        border-radius: addPX($ssm-radius);

        > div {
            outline: none;
            border: none;
            overflow: hidden;
            word-break: keep-all;
            white-space: nowrap;
            color: scale_color($lineColor, $lightness: -80%);
        }

        &-llarge {
            height: addPX($llg-height);
            line-height: addPX($llg-height - 2);
            font-size: addPX($llg-fs);
        }

        &-large {
            height: addPX($lg-height);
            line-height: addPX($lg-height - 2);
            font-size: addPX($lg-fs);
        }

        &-default {
            height: addPX($df-height);
            line-height: addPX($df-height - 2);
            font-size: addPX($df-fs);
        }

        &-small {
            height: addPX($sm-height);
            line-height: addPX($sm-height - 2);
            font-size: addPX($sm-fs);
        }

        &-ssmall {
            height: addPX($ssm-height);
            line-height: addPX($ssm-height - 2);
            font-size: addPX($ssm-fs);
        }

        &-clearable {
            position: absolute;
        }
    }
</style>
