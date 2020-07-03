const path = require('path')
console.log(process.cwd()+'/src/lib/M')
console.log(path.resolve(process.cwd(),'src/lib/TreeModal/TreeModal.vue'), 'path')
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
            ['/', '简介'],
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
        [
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
    ]
}

function getPath(ComponentName) {
    return path.resolve(process.cwd(),`src/lib/${ComponentName}`)
}
