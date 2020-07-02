module.exports = {
    // do something...

    chainWebpack: config => {
        config.module
            .rule('md')
            .test(/\.md$/)
            .use('markdown-loader')
            .loader('markdown-loader')
            .loader('html-loader')
    }

    // do something...
}