<script>
    import classNames from 'classnames'
    import _ from 'lodash'

    export default {
        name: 'CDatePicker',
        props: {
            width:{
                type: String,
                default(){
                    return ''
                }
            }
        },
        data() {
            return {
                isDropUlShow: false
            };
        },
        mounted() {
        },
        computed: {
            xClass() {
                const prefix = this.prefix ? this.prefix + '-' : '';
                return classNames(
                )
            },

            getDateWrapClass() {
                const prefix = this.prefix ? this.prefix + '-' : '';
                return classNames({
                    [prefix + 'date-wrap']: true
                })
            },
        },
        methods: {},
        watch: {
            log: {
                handler(v) {
                    v && v()
                },
                deep: true,
                immediate: true
            },

        },
        render(h) {
            return h('div',
                {
                    ref: 'date-wrap',
                    class: this.getDateWrapClass,
                    style:{
                        width: this.width? this.width+ 'px': '100%',
                    }
                },
                [
                    h('CInput',
                        {
                            size: this.size,
                            style: {
                                position: 'relative'
                            },
                            on:{
                                focus: ()=>{
                                    this.isDropUlShow = true
                                }
                            }
                        },
                        [
                            h('CIcon',
                                {
                                    slot: 'behind-icon',
                                    props: {
                                        iconName: 'choas-clock',
                                        color: '#aaa',
                                    },
                                }
                            )
                        ]
                    ),
                    h('div',
                        {
                            class:['date-dropdown'],
                            style:{
                                display: this.isDropUlShow? 'block': 'none'
                            }
                        },
                        [
                            h('div',
                                {},
                                ['title-box']
                            ),
                            h('div',
                                {},
                                ['content-box']
                            ),
                            h('div',
                                {},
                                ['foot-box']
                            )
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

    .date{
        &-wrap{
            position: relative;
        }
        &-dropdown{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            background: #fff;
            position: absolute;
            border-radius: addPX($sm-borderWt);
            width: 100%;
            min-width: 200px;
            top: calc(100% + 4px);
            z-index: 90;
            border: 1px solid $lineColor;
        }
    }
</style>
