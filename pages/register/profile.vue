<template>
<div class="h-screen w-screen container-small">
  <div class="justify-center pt-24">
    <div class="text-center">
      <div class="text-5xl text-white font-black leading-tight px-8">
        Personalize Your Wallet Profile
      </div>
      <p class="text-white font-bold">Add some personal information for others to see when they visit {{name}}</p>
    </div>
    <div class="border border-yellow-300 mt-8 p-12 w-full rounded">
      <div class="flex">
        <div class="text-center w-4/12">
          <div class="text-white mr-8"> Profile </div>
          <div v-if="!avatarhash">
            <div class="border border-white rounded-full flex justify-center items-center" style="height: 150px; width: 150px;">
              <div class="input--file">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3.2"/>
                    <path fill="#53AD53" d="M9 2l-1.83 2h-3.17c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2h-3.17l-1.83-2h-6zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
                    <path d="M0 0h24v24h-24z" fill="none"/>
                  </svg>
                </span>
                <input type="file" id="file" ref="file" v-on:change="onChangeFileUpload()" />
              </div>
            </div>
          </div>
          <div v-else>
            <div 
              class="border border-white rounded-full flex justify-center items-center bg-cover"
              style="height: 150px; width: 150px;" 
              :style="{ backgroundImage: `url(${infurl}${avatarhash})` }"
              >
              </div>
          </div>
        </div>
        <div class="w-8/12">
          <div class="text-white text-left">
            <div>Full Name</div>
          </div>
          <div>
            <input v-model="name" class="w-full border-b border-b-4 border-yellow-300 bg-transparent text-white text-lg" type="text">
          </div>
          <div class="text-white text-left mt-8">
            <div>Location</div>
          </div>
          <div>
            <input v-model="location" class="w-full border-b border-b-4 border-yellow-300 bg-transparent text-white text-lg" type="text">
          </div>
        </div>
      </div>
      <div class="w-full mt-12">
         <div class="text-white text-left">
            <div>Bio</div>
          </div>
          <div>
            <textarea v-model="bio" class="p-4 w-full border border-4 border-yellow-300 bg-transparent text-white text-lg" type="text" col="6"></textarea>
          </div>
      </div>
    </div>
    <div class="text-center mt-16 flex flex-col">
      <button @click="createprofile()" type="button" class="bg-transparent rounded-full mx-auto border border-yellow-300 px-8 py-3 text-yellow-300 font-bold">Join Us!</button>
    </div>
  </div>
</div>
</template>
<script>
import { mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import { setupENS, setContenthash } from '@ensdomains/ui'
const ENS = require('ethereum-ens')

const contentHash = require('content-hash')

const clientInit = require('demo-webify')
// TODO This should be moved into init / mounted

export default {
  layout: 'register',
  data (){
    return {
      avatarhash: null,
      infurl: 'https://ipfs.io/ipfs/',
    }
  },
  mounted() {
    clientInit().then(() => {
      //setupENS({ customProvider: demo.thisSignerEth.provider })
      const ens = new ENS(demo.thisSignerEth.provider)
      try {
        return ens.reverse(demo.thisAddress)
      } catch(e) { this.ensName = 'ENS name not found' }
    })
    .then((name) => this.ensName = name)
  },
  methods: {
    init: () => {
    }
  },
  computed: {
    ...mapState({
      username: state => state.username,
      avatar: state => state.avatar,
      name: state => state.name,
      location: state => state.location,
      bio: state => state.bio,
    }),
    name: function() { return this.ensName },
    ...mapFields('register', ['name', 'location', 'bio']),
    profilehtml: function (){
      return `<div class="border border-yellow-300 mt-8 p-12 w-8/12 rounded"> <div class="text-center"> <div class="rounded-full flex justify-center items-center bg-cover mx-auto" style="height: 150px; width: 150px;background-image: url(https://ipfs.io/ipfs/${this.avatarhash});" > </div><h1 class="text-white text-4xl font-bold mt-8">${this.name}</h1> <div class="text-white"> <svg class="h-4 inline-block text-white mr-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marker-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" class=""></path></svg>${this.location}</div></div><div class="flex justify-between items-center mt-8 border-b border-yellow-300 pb-12"> <button type="button" class="rounded-full mx-auto border border-yellow-300 px-8 py-2 bg-yellow-300 text-black font-bold">Send Payment</button> <button type="button" class="rounded-full mx-auto border border-yellow-300 px-8 py-2 text-yellow-300 font-bold">Add Friend</button> </div><div class="mt-8 text-white"> <div class="text-lg font-bold"> Bio </div><p class="text-white">${this.bio}</p></div></div>` 
    }
  },
  methods: {
    createprofile(){
      let formData = new FormData()
      formData.append("file", this.profilehtml)
      let self = this
      this.$axios
        .post('https://ipfs.infura.io:5001/api/v0/add?pin=false', formData)
        .then(function (response) {
          // this is the profile html
          console.log(response.data.Hash)
          const contentH = contentHash.fromIpfs(response.data.Hash)
          return setContenthash(ensName, contentH)
        })
        .then(function (txReceipt) {
          console.log(`Setting content hash ${JSON.stringify(txReceipt)}`)
          self.$router.push('/register/success')
        })
        .catch(function (error) {
          console.log(error);
          self.$router.push('/register/error')
        });

    },
    onChangeFileUpload(){
      this.file = this.$refs.file.files[0]
      console.log(this.file)

      let formData = new FormData()
      formData.append("file", this.file)
      this.$axios
        .post('https://ipfs.infura.io:5001/api/v0/add?pin=false', formData)
        .then((result) => {
          const avatarhash = result.data.Hash
          this.$store.dispatch('register/addavatarhash', { avatarhash })
          this.avatarhash = avatarhash
          console.log(result.data.Hash)
        })
        .catch((err) => {
            console.log(err);
        }) 
    }
  }
}
</script>
<style>

.input--file {
  position: relative;
}
.input--file input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 150px;
  height: 150px;
}
</style>
