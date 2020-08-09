<script>
    import classNames from 'classnames'
    import _ from 'lodash'

    export default {
        name: 'CDatePicker',
        props: {
            log: {}
        },
        data() {
            return {};
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
                },
                [
                    h('CInput',
                        {
                            size: this.size,
                            style: {
                                position: 'relative'
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
                    h('ul',
                        {},
                        [123]
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
</style>
