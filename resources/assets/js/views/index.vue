<template>
  <div>
      <app-header></app-header>
      <router-view></router-view>
      <app-footer></app-footer>
  </div>
</template>
<script>
import appHeader from './app-header'
import appFooter from './app-footer'
export default {
    components: {
      appHeader, appFooter
   },
}
</script>

<style>

</style>
