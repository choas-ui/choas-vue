import VueRouter from 'vue-router'

const routes = [
    {
        path: '/hello',
        name: 'hello',
        component: () => import('../doc/HelloWorld/HelloWorld')
    },
    {
        path: '/',
        name: 'app',
        component: () => import('../App.vue')
    }
]

const router = new VueRouter({
    routes
})
export default router

