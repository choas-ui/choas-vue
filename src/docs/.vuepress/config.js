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
                title: '组件',
                children: [
                    {
                        title: '弹框',
                        children: [
                            ['/components/modal', '一般弹框'],
                            ['/components/treeModal', '树形弹框'],
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

