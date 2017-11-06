
import VueRouter from 'vue-router'
import DashboardRoutes from './dashboard'
import { api_token } from '../store/Auth'

const routes = [];

const router = new VueRouter({
    mode: 'history',
    routes: routes.concat(DashboardRoutes)
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && !api_token) {
      next({ path: '/dashboard/login'});
    } else {
      next();
    }
  });

export default router;