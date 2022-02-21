<template>
  <div id="subContainer" style="height:100%">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#subContainer {
  .size;
}
</style>
