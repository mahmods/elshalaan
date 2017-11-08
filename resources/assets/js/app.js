import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router/index'
import Auth from './store/Auth'
import Toasted from 'vue-toasted';
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import App from './app.vue'

Vue.component('icon', Icon)

Vue.use(VueRouter)
Vue.use(Auth)
Vue.use(Toasted, {
    position: 'bottom-right',
    duration: '3000',
    theme: 'bubble'
})

const app = new Vue({
    el: '#root',
    template: '<app></app>',
    components: { App },
    router,    
})