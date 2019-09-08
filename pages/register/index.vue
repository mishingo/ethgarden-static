<template>
  <div>
    <div class="container">
    <h1>Welcome Gardener!</h1>
    <p> Register your garden here. We look forward to growing with you. </p>
    <h1>Your Address</h1>
    <p>
      This address has been created just for you in this browser's localStorage.
    </p>
    <span>
      {{ ethaddress }}
    </span>
    </div>
    <div class="container p-4 bg-green">
    </div>
  </div>
</template>

<script>
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

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
    demo.chainId = await demo.eth.net_version()
    const thisPassword = localStorage.getItem(`demo/${demo.chainId}/thisPassword`)
    const { signerEth } = await demo.keys.wallet.prepareSignerEth({
      address: demo.thisAddress, password: thisPassword })
    demo.thisSignerEth = signerEth
    // Do ETHGarden-specific init here
  }

  export default {
    data (){
      return {
        template: null,
        fullname: 'Brother Mazone'
      }
    },
    methods: { init },
    mounted() {
      this.init()
    },
    computed: {
      ethaddress: function() {
        return  localStorage.getItem(`demo/${demo.chainId}/thisAddress`)  
      },
      personalsite: function() {
       return `<h1> hello Eth! I am ${this.fullname} </h1>`
      }
    }
  }

</script>
