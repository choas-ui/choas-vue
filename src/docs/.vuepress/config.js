const path = require('path')

function getPath(ComponentName) {
    return path.resolve(process.cwd(), `src/lib/${ComponentName}`)
}

function registerComponentsList() {
    return [
        '@vuepress/register-components',
        {
            components: [
                {
                    name: 'Icon',
                    path: getPath('Icon')
                },
                {
                    name: 'Button',
                    path: getPath('Button')
                },
                {
                    name: 'Modal',
                    path: getPath('Modal')
                },
                {
                    name: 'Tree',
                    path: getPath('Tree')
                },
                {
                    name: 'Cascade',
                    path: getPath('Cascade')
                },
                {
                    name: 'TreeModal',
                    path: getPath('TreeModal')
                },



                {
                    name: 'InputTreeModal',
                    path: getPath('InputTreeModal')
                }
            ]
        }
    ]
}

module.exports = {
    title: 'Choas-vue',
    description: 'Choas Choas and more',
    head: [
        ['link', {rel: 'icon', href: '/logo.png'}]
    ],
    themeConfig: {
        nav: [
            {text: '首页', link: '/'},
            {text: '组件', link: '/components/'},
            {text: '日志', link: '/logs/'},
            {text: 'issues', link: 'https://github.com/faliye/choas-vue/issues'},
            {text: 'GitHub', link: 'https://github.com/faliye/choas-vue'}
        ],
        sidebarDepth: 2,
        sidebar: {
            '/components': [
                ['/components/', '概述'],
                {
                    title: '组件',
                    children:[
                        {
                            title: '独立组件',
                            children: [
                                [
                                    '/components/common/button', '按钮 Button'
                                ],
                                [
                                    '/components/common/icon', '图标 Icon'
                                ],
                                [
                                    '/components/common/input', '输入框* Input'
                                ],
                                [
                                    '/components/common/modal', '弹层 Modal'
                                ],
                                [
                                    '/components/common/prompt', '提醒* Prompt'
                                ],
                                [
                                    '/components/common/select', '下拉框* Select'
                                ],
                                [
                                    '/components/common/table', '表格* Table'
                                ],
                                [
                                    '/components/common/tag', '标签* Tag'
                                ],
                                [
                                    '/components/common/tree', '树形 Tree'
                                ],

                            ]
                        },
                        {
                            title: '复合组件',
                            children: [
                                [
                                    '/components/complex/cascade', '级联* Cascade'
                                ],
                                [
                                    '/components/complex/treeModal', '树形弹框* TreeModal'
                                ],
                                [
                                    '/components/complex/selectTree', '树形选择器* SelectTree'
                                ],
                                [
                                    '/components/complex/selectTree', '穿梭框* Shuttle'
                                ],
                            ]
                        },
                        {
                            title: '特异组件',
                            children: [
                                [
                                    '/components/custom/inputTreeModal', 'input树形弹窗* InputTreeModal'
                                ],
                            ]
                        }
                    ]
                }
            ],
            '/logs':[
                {
                    title: '迭代日志',
                    children: [
                        ['/logs/version', '日志'],
                        {
                            title: 'BUG',
                            children: [
                                ['/logs/bug/bug','Bug'],
                                ['/logs/bug/20200704', '20200704']
                            ]
                        }
                    ]
                }
            ]
        }
    },
    plugins: [
        registerComponentsList(),
        [
            'vuepress-plugin-demo-container'
        ],
        //
        // // 这是 VuePress 默认主题使用这个插件的方式
        // [
        //     'vuepress-plugin-container',
        //     {
        //         type: 'tip',
        //         defaultTitle: {
        //             '/': 'TIP',
        //             '/zh/': '提示',
        //         },
        //
        //     }
        // ],
        // [
        //     'vuepress-plugin-container',
        //     {
        //         type: 'demo',
        //         before: info => `<div class="theorem"><p class="title">${info}</p>`,
        //         after: '</div>',
        //     },
        // ],
    ]
}

