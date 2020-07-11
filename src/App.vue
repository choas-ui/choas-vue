<template>
    <CInputTreeModal
            :can-be-edited="canBeEdited"
            :list-data="listData"
            :reflect-key="reflectKey"
            v-model="selectedData"
            title="请选择机构"

            placeholder="请选择机构节点"
            condition-props="type"
            @getListData="getListData"
    />
</template>

<script>

    export default {
        name: 'App',
        components: {},
        data() {
            return{
                canBeEdited: true,
                selectedData: [
                    {
                        id: '014557484S-2-2-0017',
                        name: '谢广坤',
                    }
                ],
                reflectKey: {
                    key: 'name',
                    value: 'id'
                },
                listData: [
                    {
                        id: '014557484S',
                        name: '特殊事务部',
                        expand: true,
                        type: true,
                        children: [
                            {
                                id: '014557484S-0',
                                name: '指挥部',
                                expand: true,
                                type: true,
                                children: [
                                    {
                                        id: '014557484S-0-007',
                                        name: '谢永强',
                                    },
                                    {
                                        id: '014557484S-0-008',
                                        name: '谢大脚',
                                    },
                                ],
                            },
                            {
                                id: '014557484S-1',
                                name: '后勤',
                                expand: true,
                                type: true,
                                children: [
                                    {
                                        id: '014557484S-1-0017',
                                        name: '尼古拉斯.赵',
                                    },
                                    {
                                        id: '014557484S-1-0019',
                                        name: '王常规',
                                    },

                                ],
                            },
                            {
                                id: '014557484S-2',
                                name: '业务部',
                                expand: true,
                                type: true,
                                children: [
                                    {
                                        id: '014557484S-2-1',
                                        name: '一组',
                                    },
                                    {
                                        id: '014557484S-2-2',
                                        name: '二组',
                                        expand: true,
                                        type: true,
                                        children: [
                                            {
                                                id: '014557484S-2-2-0017',
                                                name: '谢广坤',
                                            },
                                            {
                                                id: '014557484S-2-2-0018',
                                                name: '王小蒙',
                                            },
                                            {
                                                id: '014557484S-2-2-0018',
                                                name: '刘能',
                                            },
                                        ],
                                    },
                                ]
                            },
                        ]
                    }
                ],
            }
        },
        methods:{
            getListData(v){
                console.log(v)
            },
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    body {
        margin: 0;
    }

    button.usr-btn-class {
        background: red;
    }
</style>
