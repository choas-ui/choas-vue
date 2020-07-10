<template>
    <div style="width: 300px">
        <CTree
                fileIcon
                :list-data="listData"
                v-model="selectData"
        >
            <CIcon
                    slot="icon-mark"
                    icon-name="choas-square-add"
            />
            <CIcon
                    slot="file-icon"
                    icon-name="choas-lists"/>
            <template slot="tails">
                <CIcon
                        color="red"
                        icon-name="choas-delete"
                        @click="logs"
                />
                <CIcon
                        color="red"
                        icon-name="choas-square-add"
                        @click="logs"
                />
            </template>
        </CTree>
    </div>
</template>

<script>

    export default {
        name: 'App',
        components: {},
        data() {
            return {
                listData:[
                    {
                        key: '颜色',
                        value: '0',
                        expand: true,
                        children:[
                            {
                                key: '冷色',
                                value: '0-0',
                            },
                            {
                                key: '暖色',
                                value: '0-1',
                                expand: true,
                                children:[
                                    {
                                        key: '红色',
                                        value: '0-1-0',
                                    },
                                    {
                                        key: '橙色',
                                        value: '0-1-1',
                                        children: [
                                            {
                                                key: '橙红',
                                                value: '0-1-1-0',
                                            },
                                        ],
                                    },
                                ]
                            },
                        ]
                    }
                ],
                selectData:[],
                searchStr:'',
            }
        },
        methods:{
            logs(a,b,c){console.log(a,b,c)}
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
