<template>
    <CTree
            :file-icon-fix-margin-left="6"
            :mark-icon-fix-margin-left="6"
            line
            :list-data="listData"
            v-model="selectData"
            controllers
    >
        <CIcon
                slot="mark-icon"
                icon-name="choas-square-add"
        />
        <CIcon
                slot="file-icon"
                icon-name="choas-lists"/>
    </CTree>
</template>

<script>

    export default {
        name: 'App',
        components: {},
        data(){
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
            logs(item,event){console.log(item,event)}
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
