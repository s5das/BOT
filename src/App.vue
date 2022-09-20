<template>
  <div id="app">
    
  <router-view></router-view>
  <tabbar></tabbar>
  <cellgroup></cellgroup>
  </div>
</template>

<script>
import tabbar from '@/components/tabbar.vue'
import cellgroup from '@/components/cellgroup.vue'


export default {
  components: { tabbar, cellgroup},
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
