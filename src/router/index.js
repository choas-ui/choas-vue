import VueRouter from 'vue-router'

const routes = [
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

