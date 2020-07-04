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
                    name: 'Button',
                    path: getPath('Button')
                },
                {
                    name: 'Modal',
                    path: getPath('Modal')
                },
                {
                    name: 'TreeModal',
                    path: getPath('TreeModal')
                }
            ]
        }
    ]
}

module.exports = {
    title: 'Choas-UI',
    description: 'Choas For Vue',
    head: [
        ['link', {rel: 'icon', href: '/logo.png'}]
    ],
    themeConfig: {
        nav: [
            {text: '组件', link: '/'}
        ],
        sidebarDepth: 2,
        sidebar: [
            ['/', '快速上手'],
            {
                title: '基础组件',
                children: [
                    ['/components/common/Button/button', '按钮 Button'],
                    ['/components/common/Modal/modal', '模态层 modal'],

                ]
            },
            {
                title: '复合组件',
                children: [
                    ['/components/complex/treeModal', '树形弹框 TreeModal'],
                ]
            }
        ]
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

