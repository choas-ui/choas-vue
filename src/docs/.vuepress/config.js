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
                    name: 'CIcon',
                    path: getPath('CIcon')
                },
                {
                    name: 'CButton',
                    path: getPath('CButton')
                },
                {
                    name: 'CModal',
                    path: getPath('CModal')
                },
                {
                    name: 'CTree',
                    path: getPath('CTree')
                },
                {
                    name: 'CCascade',
                    path: getPath('CCascade')
                },
                {
                    name: 'CCascadeItem',
                    path: path.resolve(process.cwd(), `src/lib/CCascadeItem/CCascadeItem`)
                },
                {
                    name: 'CTreeModal',
                    path: getPath('CTreeModal')
                },
                {
                    name: 'CSelection',
                    path: getPath('CSelection')
                },



                {
                    name: 'CInputTreeModal',
                    path: getPath('CInputTreeModal')
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
            {text: '工程', link: '/project/'},
            {text: 'issues', link: 'https://github.com/choas-ui/choas-vue/issues'},
            {text: 'GitHub', link: 'https://github.com/choas-ui/choas-vue'}
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
                                    '/components/common/button', '按钮 CButton'
                                ],
                                [
                                    '/components/common/icon', '图标 CIcon'
                                ],
                                [
                                    '/components/common/input', '输入框* CInput'
                                ],
                                [
                                    '/components/common/modal', '弹层 CModal'
                                ],
                                [
                                    '/components/common/prompt', '提醒* CPrompt'
                                ],
                                [
                                    '/components/common/selection', '下拉框* CSelection'
                                ],
                                [
                                    '/components/common/table', '表格* CTable'
                                ],
                                [
                                    '/components/common/tag', '标签* CTag'
                                ],
                                [
                                    '/components/common/tree', '树形 CTree'
                                ],

                            ]
                        },
                        {
                            title: '复合组件',
                            children: [
                                [
                                    '/components/complex/cascade', '级联* CCascade'
                                ],
                                [
                                    '/components/complex/treeModal', '树形弹框* CTreeModal'
                                ],
                                [
                                    '/components/complex/selectTree', '树形选择器* CSelectTree'
                                ],
                                [
                                    '/components/complex/selectTree', '穿梭框* CShuttle'
                                ],
                            ]
                        },
                        {
                            title: '特异组件',
                            children: [
                                [
                                    '/components/custom/inputTreeModal', 'input树形弹窗* CInputTreeModal'
                                ],
                            ]
                        }
                    ]
                }
            ],
            '/logs':[
                ['/logs/', '概述'],
                {
                    title: '迭代日志',
                    children: [
                        ['/logs/version', '日志'],
                        ['/logs/plans', '计划'],
                        {
                            title: 'BUG',
                            children: [
                                ['/logs/bug/bug','Bug'],
                                ['/logs/bug/20200704', '20200704']
                            ]
                        }
                    ]
                }
            ],
            '/project':[
                {
                    title: '工程*',
                    children: []
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

