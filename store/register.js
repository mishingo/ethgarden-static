import { getField, updateField } from 'vuex-map-fields';

// initial state
const state = () => ({
  username: ''
})

// actions
const getters = {
  getField
}

// mutations
const mutations = {
  updateField
}

export default {
  state,
  getters,
  mutations
}