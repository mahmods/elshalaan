<template>
  <div>
      <app-header></app-header>
      <section id="Our-Serviece" class="serviece">
        <div class="container">
            <div class="row">

            </div>
            <div class="row">
                <div v-for="item in services" :key="item.id" class="col-s-12 col-m-6 col-l-4">
                    <div class="serviece-block">
                        <span>
                            <i><img :src="'/img/'+item.image"></i>
                        </span>
                        <h3>{{item.title}}</h3>
                        <p>{{item.content}}</p>

                    </div>
                </div>
            </div>
        </div>
    </section>
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
           services: []
       }
   },
   created() {
       get('posts/query?category=خدماتنا')
       .then(repsonse => {
           this.services = repsonse.data.items
       })
   }
}
</script>
