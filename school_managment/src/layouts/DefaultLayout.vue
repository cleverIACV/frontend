<template>
    <div>
      <Navbar />
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Header/Navbar/navbar.vue';
  
  export default {
    name: 'DefaultLayout',
    components: {
      Navbar
    }
  }
  </script>
  