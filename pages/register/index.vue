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

  export default {
    data (){
      return {
        template: null,
        fullname: 'Brother Mazone'
      }
    },
    methods: {  },
    mounted() {
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
