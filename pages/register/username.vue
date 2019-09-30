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
import { mapFields } from 'vuex-map-fields'
const { assert } = require('chai')
const ENS = require('ethereum-ens')
import { setReverseRecordName } from '@ensdomains/ui'

const PUBLIC_RESOLVER_ADDRESS={
  "1": "0xD3ddcCDD3b25A8a7423B5bEe360a42146eb4Baf3",
  "4": "0x2396A687f75f1a13e3927F1841B291350b0ED977",
}

const registerFunc = async (name, contentHash) => {
  const ens = new ENS(demo.thisSignerEth.provider)
  //const ens = new ENS({provider: signerEth.provider, network: demo.chainId })
  await ens.resolver('ourgarden.eth').addr().then((addr) => console.log('Address', addr))
  assert(PUBLIC_RESOLVER_ADDRESS[demo.chainId])
  const params = { from: demo.thisAddress, gas: demo.config['GAS_LIMIT'] }
  const fullName = `${name}.ourgarden.eth`
  console.log(`fullName ${fullName}`)
  const txHash1 = await ens.setSubnodeOwner(fullName, demo.thisAddress, params)
  console.log(`Setting subNodeOwner txHash ${JSON.stringify(txHash1)}`)
  const txHash2 = await ens.setResolver(fullName, PUBLIC_RESOLVER_ADDRESS[demo.chainId], params)
  console.log(`Setting setResolver txHash ${JSON.stringify(txHash2)}`)
  const resolver = ens.resolver(fullName)
  const txHash3 = await resolver.setAddr(demo.thisAddress, params)
  console.log(`Setting address txHash ${JSON.stringify(txHash3)}`)
  const reverseResolver = ens.resolver(`${demo.thisAddress}.addr.reverse`)
  const txHash4 = await reverseResolver.name(fullName, params)
  console.log(`Setting reverse record name txHash ${JSON.stringify(txHash4)}`)
  return {
    txHash1,
    txHash2,
    txHash3,
  }
}

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
        registerFunc(this.username)
          .then(() => { this.$router.push('/register/password') })
          .catch((e) => { console.error(JSON.stringify(e.message)) })
      } else {
        this.invalid = true
      }
    }
  }
}
</script>
