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
                    name: 'CButton',
                    path: getPath('CButton')
                },
                {
                    name: 'CIcon',
                    path: getPath('CIcon')
                },

                {
                    name: 'CModal',
                    path: getPath('CModal')
                },
                {
                    name: 'CSelection',
                    path: getPath('CSelection')
                },
                {
                    name: 'CTag',
                    path: getPath('CTag')
                },
                {
                    name: 'CTree',
                    path: getPath('CTree')
                },

                // complex
                {
                    name: 'CCascade',
                    path: getPath('CCascade')
                },
                {
                    name: 'CTreeModal',
                    path: getPath('CTreeModal')
                },


                // custom
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
                                    '/components/common/message', '提醒* CMessage'
                                ],
                                [
                                    '/components/common/modal', '弹层 CModal'
                                ],
                                [
                                    '/components/common/notification', '弹层 CNotification'
                                ],
                                [
                                    '/components/common/progress', '进度条 CProgress'
                                ],
                                [
                                    '/components/common/prompt', '提醒* CPrompt'
                                ],
                                [
                                    '/components/common/selection', '下拉框* CSelection'
                                ],
                                [
                                    '/components/common/skeleton', '骨架屏* CSkeleton'
                                ],
                                [
                                    '/components/common/table', '表格* CTable'
                                ],
                                [
                                    '/components/common/tag', '标签 CTag'
                                ],
                                [
                                    '/components/common/timeLine', '时间线* CTimeLine'
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
                                    '/components/complex/shuttle', '穿梭框* CShuttle'
                                ],
                                [
                                    '/components/complex/uploader', '上传文件* CUploader'
                                ],
                            ]
                        },
                        {
                            title: '特异组件',
                            children: [
                                [
                                    '/components/custom/inputCascade', 'input级联* CInputCascade'
                                ],
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
                        ['/logs/plans', '计划']
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

