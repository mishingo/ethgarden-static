<template>
<div class="h-screen w-screen container-small"  v-if="userprofile">
  <div class="flex justify-center pt-24 pb-32" v-html="userprofile">
  </div>
</div>
</template>
<script>

export default {
  layout: 'register',
  data (){
    return {
      userprofile: null,
      userparam: null,
      ens: null
    }
  },
  mounted (){
    this.gethtml()
    this.userparam = this.$router.currentRoute.params.user
    this.ens = `${this.$router.currentRoute.params}.user.ourgarden.eth`
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
