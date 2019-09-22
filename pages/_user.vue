<template>
<div class="h-screen w-screen container-small"  v-if="userprofile">
  <div class="flex justify-center pt-24 pb-32" v-html="userprofile">
  </div>
</div>
</template>
<script>

const ENS = require('ethereum-ens')
const clientInit = require('demo-webify')

export default {
  layout: 'register',
  data (){
    return {
      userprofile: null,
      userparam: null,
      ens: null,
      address: null,
    }
  },
  mounted (){
    this.gethtml()
    try {
      clientInit()
        .then(() => {
          this.ens = new ENS(demo.thisSignerEth.provider)
          this.userparam = this.$router.currentRoute.params.user
          console.log(`Username ${this.userparam}`)
          return this.ens.resolver(`${this.userparam}.ourgarden.eth`)
        })
        .then((resolver) => {
          this.ensResolver = resolver; return resolver.addr()
        })
        .then((addr) => {
          this.address = addr;
          console.log(`Address ${this.address}`)
          return this.ensResolver.content()
        })
        .then((content) => {
          this.content = content;
          console.log(`Content ${this.content}`)
        })
    } catch(e) {
      console.error(e.message)
    }
  },
  methods: {
    gethtml: function(){
      let self = this
      this.$axios
        .get('https://ipfs.io/ipfs/QmSgaBKv81wUkQEKdJfR54q71dGn36hVh1R5xK3WwedjBJ')
        .then(function (response) {
          self.userprofile = response.data
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
</script>
