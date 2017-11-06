
import VueRouter from 'vue-router'
import DashboardRoutes from './dashboard'

const routes = [];

const router = new VueRouter({
    mode: 'history',
    routes: routes.concat(DashboardRoutes)
})

export default router;