#### 取消 cancel

遮罩带有cancel时可以点击取消

<script>
export default {
    data(){
        return {
            isShow: false
        }
    },
    methods: {
        showModal() {
            this.isShow = true
        }
    }
}
</script>

<template>
    <br>
    <Button @click="showModal">showModal</Button>
    <Modal
        mask
        cancel
        :title="'弹窗标题'"
        v-model="isShow"
        :width="800"
        :height="600"
        ></Modal>
</template>    

::: details 点击查看代码
``` js
<template>
    <Button @click="showModal">showModal</Button>
    <Modal
        mask
        cancel
        :title="'弹窗标题'"
        v-model="isShow"
        :width="800"
        :height="600"
        ></Modal>
</template>
<script>
export default {
    data(){
        return {
            isShow: false
        }
    },
    methods: {
        showModal() {
            this.isShow = true
        }
    }
}
</script>
```
:::