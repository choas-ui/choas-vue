<template>
    <div>
        <markdown-it-vue :content="content"/>
    </div>
</template>

<script>
    import MarkdownItVue from 'markdown-it-vue'
    import 'markdown-it-vue/dist/markdown-it-vue.css'
    import content from './HelloWorld.md'

    export default {
        components: {
            MarkdownItVue
        },
        data () {
            return {
                content
            }
        }
    }
</script>