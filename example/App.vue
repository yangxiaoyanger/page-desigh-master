<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    console.log('99999999')
  }
};
</script>

<style>
#app {
  height: 100%;
}
</style>
