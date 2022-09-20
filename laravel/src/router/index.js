import { createRouter, createWebHistory } from 'vue-router'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Admin/Dashboard.vue'
import Home from '../pages/User/Home.vue'
const routes = [
    {

        path: '/',
        name: 'Register',
        component: Register
    },
    {

        path: '/login',
        name: 'Login',
        component: Login
    },

    {

        path: '/home',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }
    },


    {

        path: '/admin',
        name: 'admin',
        component: Dashboard
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('token')) {
            next()
            return
        }
        next('/')
    } else {
        next()

    }
})
export default router