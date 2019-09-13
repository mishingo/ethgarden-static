<template>
<div class="h-screen w-screen container-small">
  <div class="flex flex-col items-center flex-1 h-full justify-center pt-24">
    <div class="text-center">
      <div class="w-full flex justify-center">
        <img src="/logo.svg" width="300">
      </div>
      <div class="text-5xl text-white font-black leading-tight px-8">
        ETH Garden
      </div>
      <p class="text-white font-bold">We help people create personalized profiles for their Ethereum wallets to aid peer-to-peer transactions and disaster relied funds.</p>
    </div>
    
    <div class="text-center mt-16">
      <nuxt-link to="/register/username" class="bg-transparent rounded-full mx-auto bg-yellow-300 px-8 py-3 text-black font-bold">Register</nuxt-link>
    </div>
  </div>
</div>
</template>
<script>
import { mapFields } from 'vuex-map-fields'

const clientInit = require('demo-webify')

export default {
  layout: 'register',
  methods: { init: clientInit },
  mounted() {
    this.init()
  },
}
</script>
