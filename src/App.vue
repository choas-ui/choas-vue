<template>
    <div id="app">
        <p>{{ selectData }}</p>
        <input type="text" v-model="searchStr">
        <template>
            <Tree
                    fileIcon
                    line
                    :list-data="listData"
                    v-model="selectData"
                    :search-str="searchStr"
            >
            </Tree>
        </template>
    </div>
</template>

<script>

    export default {
        name: 'App',
        components: {},
        data() {
            return {
                listData: {
                    key: '颜色',
                    value: '0',
                    expand: true,
                    children: [
                        {
                            key: '冷色',
                            value: '0-0',
                        },
                        {
                            key: '暖色',
                            value: '0-1',
                            expand: true,
                            children: [
                                {
                                    key: '红色',
                                    value: '0-1-0',
                                },
                                {
                                    key: '蓝色',
                                    value: '0-1-1',
                                    children: [
                                        {
                                            key: '深蓝',
                                            value: '0-1-1-0',
                                        },
                                    ],
                                },
                            ]
                        },
                    ]
                },
                selectData: [1],
                searchStr: ''
            }
        },
        methods: {
            clickHandle() {
                console.log(123)
            }
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
