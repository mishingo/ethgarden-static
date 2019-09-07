<template>
  <div>
    <h1>Welcome Gardener!</h1>
    <p>
       Register your garden here. We look forward to growing with you.
    </p>

    <h1>Your Address</h1>
    <p>
       This address has been created just for you in this browser's localStorage.
    </p>
    <span>
      {{ ethaddress }}
    </span>

  </div>
</template>

<script>

  const init = async () => {
    await demo.initFS({})
    await demo.init({ unlockSeconds: 100000 }) // keep unlocked as long as we cache password
    await demo.prepareCachedWallet({})
    await demo.prepareErasePassword({
      erasePasswordSeconds: 100000, // 100,000 seconds is 27.77 hours
      erasePasswordCallback: () => { console.log("Erasing password") },
    })
    await demo.prepareUpdateWhileCached({
      updateSeconds: 10,
      updateCallback: (secondsLeft) => { console.log(`${secondsLeft} seconds left`) },
    })
    // Do ETHGarden-specific init here
  }

  export default {
    methods: { init },
    mounted() {
      this.init()
    },
    computed: {
      ethaddress: function() {
      return  localStorage.getItem('demo/22/thisAddress')  
     }
    }
  }

</script>
