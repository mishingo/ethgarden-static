<template>
<div class="h-screen w-screen container-small">
  <div class="flex flex-col items-center flex-1 h-full justify-center pt-24">
    <div class="flex justify-center items-center left">
      <img src="https://placekitten.com/200/200" class="rounded-full h-32 w-32">
      <div class="text-5xl text-white font-black leading-tight px-8">
        Miguel Ramos Invited You to Join the Garden!
      </div>
    </div>
    <div class="text-white mt-4">
      Please create a username for your wallet.
    </div>
    <div class="flex justify-center items-end mt-8">
      <input class="border-b border-b-4 border-yellow-300 bg-transparent text-white px-2 text-xl mr-2" type="text" v-model="username" :class="[ {'border-red-400': invalid } ]">
      <span class="text-xl text-white tracking-wider">.ourgarden.eth</span>
    </div>
    <div class="text-center mt-16">
      <button class="rounded-full mx-auto border border-yellow-300 px-8 py-2 text-yellow-300 font-bold" type="button" @click="registeruser">Register</button>
    </div>
  </div>
</div>
</template>
<script>
import { mapFields } from 'vuex-map-fields';
export default {
  layout: 'register',
  data (){
    return {
      invalid: false
    }
  },
  computed: {
    ...mapFields('register', ['username'])
  },
  methods: {
    registeruser: function() {
      if(this.username !== ''){
        this.$router.push('/register/password')
      } else {
        this.invalid = true
      }
    }
  }
}
</script>