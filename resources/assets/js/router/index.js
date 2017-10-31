
import VueRouter from 'vue-router'
import DashboardRoutes from './dashboard'

import Home from '../views/home'
import About from '../views/about'
import Services from '../views/services'
import Portfolio from '../views/portfolio'

const routes = [
    {path: '/', component: Home},
    {path: '/about', component: About},
    {path: '/services', component: Services},
    {path: '/portfolio', component: Portfolio}
];

const router = new VueRouter({
    mode: 'history',
    routes: routes.concat(DashboardRoutes)
})

export default router;