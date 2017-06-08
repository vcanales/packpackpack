<template>
  <div id="app">
    <h1>Empacando Vue con webpack</h1>
    <middle />
    <div class="logos">
      <webpackLogo />
      <vueLogo />
    </div>
  </div>
</template>
<script>
import webpackLogo from '@/assets/img/webpack.svg';
import vueLogo from '@/assets/img/vue.svg';
import middle from '@/components/Middle.vue';

export default {
  name: 'app',
  components: {
    webpackLogo,
    vueLogo,
    middle,
  }
};
</script>
<style lang="scss">
html {
  background-color: #f0f0f0;
}

body {
  font-size: 14px;
}
.logos {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100px;
  svg {
    display: block;
    width: 300px;
    .a {fill:#4dba87;}
    .b {fill:#435466;}
    .c {fill:#2c3e50;}
  }
}
#app {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -mox-osx-font-smoothing: grayscale;
  color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
