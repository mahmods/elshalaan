<template>
  <div>
      <app-header></app-header>
      <router-view :team="team"></router-view>
      <app-footer></app-footer>
  </div>
</template>
<script>
import appHeader from './app-header'
import appFooter from './app-footer'
import {get} from '../helpers/api'
export default {
    components: {
      appHeader, appFooter
   },
      data() {
       return {
           services: [],
           portfolio: [],
           team: []
       }
   },
   created() {
       Promise.all([
           get('posts/query?category=خدماتنا'),
           get('posts/query?category=سابقة أعمالنا'),
           get('posts/query?category=فريق العمل'),

       ]).then(results => {
           this.services = results[0].data.items
           this.portfolio = results[1].data.items
           this.team = results[2].data.items
           console.log('promises done')
       })
       console.log('index created')
   },
}
</script>

<style>

</style>
