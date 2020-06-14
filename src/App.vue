<template>
  <div id="app">
    <div id="nav">
      <HeaderPage />
      
    </div>
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import HeaderPage from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  
  components: {
    HeaderPage,
    Footer
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
