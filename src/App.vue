<template>
  <div id="app">
    <a href="/2017" @click="navigate">Push it!</a>
    <div v-if="loading">Loading...</div>
    <component :is="currentView"></component>
  </div>
</template>

<script>
import Hello from './components/Hello'
export default {
  name: 'app',
  data: function () {
    return {
      loading: false,
      currentView: 'hello'
    }
  },
  methods: {
    navigate: function (event) {
      event.preventDefault();
      console.log(event)
      this.loading = true;
      this.currentView = undefined;
      history.pushState(undefined, undefined, event.srcElement.pathname);
    }
  },
  components: {
    Hello
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
