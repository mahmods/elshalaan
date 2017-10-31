<template>
  <div>
      <app-header></app-header>
      <!--Start About Us-->
    <section class="title">
        <div class="container">
            <h2 class="right"> سابقة أعمالنا
            </h2>
        </div>
    </section>
    <!--End About Us-->




    <!--Start Section portfolio-->

    <section  class="portfolio">
        <div class="container">
            <div class="row ">
                <div v-for="item in portfolio" :key="item.id" class="col-s-12 col-m-6 col-l-4 portfolio-block ">
                    <div class="block">
                        <div class="img-block">
                            <img :src="'/img/'+item.image">
                        </div>
                        <p>{{item.content}}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--End Section portfolio-->
    <!-- Start Section Numbers-->
    <section class="number">
        <ul>
            <li><a href="#">01</a></li>
            <li><a href="#">02</a></li>
            <li><a href="#">03</a></li>
            <li><a href="#">04</a></li>
            <li><a href="#">05</a></li>
        </ul>
    </section>
    <!--End Section Numbers-->
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
           portfolio: []
       }
   },
   created() {
       get('posts/query?category=سابقة أعمالنا')
       .then(repsonse => {
           this.portfolio = repsonse.data.items
       })
   }
}
</script>