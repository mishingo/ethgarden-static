<template>
  <div class="bg-gradient">
    <img src="/logo.svg" class="w-24 absolute" style="top: 10px; right: 10px;">
    <nuxt />
  </div>
</template>
<script>
export default {
  head: {
    bodyAttrs: {
      class: 'register'
    }
  }
}
</script>
<style>
body.register{
  background: url(/green-gradient.png) no-repeat center center fixed; 
  background-size: cover;
  min-height: 110vh;
}
</style>