<template>
    <CTree
            :list-data="listData"
            :mark-icon-fix-margin-right="20"
            v-model="selectedData"
            line
            controllers
    >
        <CIcon
                slot="expand-icon"
                icon-name="choas-add"
        />
        <CIcon
                slot="pick-up-icon"
                icon-name="choas-min"
        />
    </CTree>
</template>

<script>
    export default {
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
                                        expand: true,
                                        children: [
                                            {
                                                key: '橙红',
                                                value: '0-1-1-0',
                                                expand: true,
                                                children: [
                                                    {
                                                        key: '1',
                                                        value: '0-1-1-0-0',
                                                        expand: true,
                                                        children: [
                                                            {
                                                                key: '2',
                                                                value: '0-1-1-0-0-0',
                                                                expand: true,
                                                                children: [
                                                                    {
                                                                        key: '3',
                                                                        value: '0-1-1-0-0-0-0',
                                                                    },
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ]
                            },
                        ]
                    }
                ],
                selectedData:[],
            }
        },
        mounted() {
        },
        methods: {
            clickHandle() {

            }
        }
    }
</script>

<style lang="scss">
    body {
        margin: 0;
        overflow: hidden;
        height: 100vh;
        width: 100vw;
    }
</style>
