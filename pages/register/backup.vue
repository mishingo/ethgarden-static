<template>
<div class="h-screen w-screen container-small">
  <div class="flex flex-col items-center flex-1 h-full justify-center pt-24">
    <div class="text-center">
      <div class="w-full flex justify-center">
        <img src="/key.svg" width="100">
      </div>
      <div class="text-5xl text-white font-black leading-tight px-8">
        Backup Your Key
      </div>
      <p class="text-white font-bold">Choose a friend to recover your wallet for you in the event that you lose your private key. By default, we suggest the person who invited you, but you can choose another user.</p>
    </div>
    <div class="border border-yellow-300 mt-8 p-6 w-8/12 rounded">
      <div class="flex justify-start items-center">
        <div class="mr-8 flex justify-start">
          <div class="rounded-full border border-yellow-300 h-5 w-5 flex justify-center items-center">
            <div class="bg-yellow-300 h-2 w-2 rounded-full"></div>
          </div>
        </div>
        <div class="flex justify-center items-center">
          <img src="https://placekitten.com/200/200" class="rounded-full h-12 w-12 mr-4">
          <div class="text-lg text-white font-bold leading-tight">
            Miguel R. (miguel.ourgarden.eth)
          </div>
        </div>
      </div>
      <div class="flex justify-start items-center mt-4">
        <div class="mr-8 ">
          <div class="rounded-full border border-yellow-300 h-5 w-5 flex justify-center items-center">
         
          </div>
        </div>
        <div class="flex justify-center items-end">
          <span class=" text-white">Another ETHGarden user:</span>
          <input class="border-b border-b-4 border-yellow-300 bg-transparent text-white px-2" type="text">
        </div>
      </div>
    </div>
    <div class="text-center mt-16 flex flex-col">
      <nuxt-link to="/register/backup" class="bg-transparent rounded-full mx-auto border border-yellow-300 px-8 py-3 text-yellow-300 font-bold">Got It!</nuxt-link>
      <nuxt-link to="/register/profile" class="mt-4 underline">Skip for now</nuxt-link>
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