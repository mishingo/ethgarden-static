<template>
<div class="h-screen w-screen container-small">
  <div class="flex flex-col items-center flex-1 h-full justify-center pt-24">
    <div class="text-center">
      <div class="w-full flex justify-center">
        <img src="/successlogo.svg" width="160">
      </div>
      <div class="text-5xl text-white font-black leading-tight px-8">
        Registration Successful!
      </div>
      <p class="text-white font-bold">You're all set up to send and receive payments! <br /> Go ahead and start exploring ETHGarden.</p>
    </div>
    
    <div class="text-center mt-16">
      <nuxt-link :to="`/${username}`" class="bg-transparent rounded-full mx-auto bg-yellow-300 px-8 py-3 text-black font-bold">View my profile</nuxt-link>
    </div>
  </div>
</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'register',
  computed: {
    ...mapState({
      username: state => state.register.username,
    })
  }
}
</script>