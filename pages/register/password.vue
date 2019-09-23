<template>
<div class="h-screen w-screen container-small">
  <div class="flex flex-col items-center flex-1 h-full justify-center pt-24">
    <div class="text-center">
      <div class="w-full flex justify-center">
        <img src="/wallet.svg" width="100">
      </div>
      <div class="text-5xl text-white font-black leading-tight px-8">
        Wallet Created
      </div>
      <p class="text-white font-bold">Below is your wallet's password. This is a unique password that gives you access to your wallet (don't share it with anyone). You won't be able to access your funds if you lose this, so write it down or keep it safe in a password manager.</p>
    </div>
    <div class="flex justify-center items-center mt-12">
      <div class="text-black text-2xl  mr-6">
        Password:
      </div>
      <div class="flex justify-center items-center">
        <input type="text" v-model="password" class=" px-6 bg-white h-12 rounded-tl rounded-bl w-64">
        <button type="button"
          v-clipboard:copy="password"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          class="bg-black text-white px-4 h-12 rounded-tr rounded-br"
        >Copy</button>
      </div>
    </div>
    <div class="text-center mt-16">
      <nuxt-link to="/register/backup" class="bg-transparent rounded-full mx-auto border border-yellow-300 px-8 py-3 text-yellow-300 font-bold">Got It!</nuxt-link>
    </div>
  </div>
</div>
</template>
<script>
import { mapFields } from 'vuex-map-fields'

export default {
  layout: 'register',
  data (){
    return {
      password: 'somehash'
    }
  },
  mounted () {
    this.password = localStorage.getItem(`demo/${demo.chainId}/thisPassword`)  
  },
  methods: {
    onCopy: function (e) {
      alert('You just copied: ' + e.text)
    },
    onError: function (e) {
      alert('Failed to copy texts')
    }
  }
}
</script>
