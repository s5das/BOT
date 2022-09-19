<template>
  <div id="app">
    
  <router-view></router-view>
  <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from '@/components/tabbar.vue'



export default {
  components: { tabbar},
  name: 'App',
  methods: {

  }
}

</script>

<style>
body{user-select: none;
     background-color: #EFEFEF ;
}

</style>
