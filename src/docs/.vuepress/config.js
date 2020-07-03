const path = require('path')

function getPath(ComponentName) {
    return path.resolve(process.cwd(),`src/lib/${ComponentName}`)
}

function getComponentsList(){
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
    markdown: {
        lineNumbers: true
    },
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
                    ['/components/common/button', '按钮'],
                ]
            },
            {
                title: '复合组件',
                children: [
                    {
                        title: '弹框',
                        children: [
                            ['/components/complex/modal', '一般弹框'],
                            ['/components/complex/treeModal', '树形弹框'],
                        ]
                    }
                ]
            }
        ]
    },
    plugins: [
        getComponentsList()
    ]
}

