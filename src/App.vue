<template>
    <CTree
            :file-icon-fix-margin-left="6"
            :mark-icon-fix-margin-left="6"
            line
            :list-data="listData"
            v-model="selectData"
    >
        <CIcon slot="controllers"
               con-name="choas-confirm"
               @click="logs"
        />
        <CIcon slot="controllers"
               icon-name="choas-min"
               @click="logs"
        />
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
        },
        updated() {
            console.log(123)
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
