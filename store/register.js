import { getField, updateField } from 'vuex-map-fields';

// initial state
const state = () => ({
  username: '',
  avatar: '',
  name: '',
  location: '',
  bio: ''
})

// actions
const getters = {
  getField
}

// mutations
const mutations = {
  updateField,
  setavatarhash (state, avatarhash) {
    state.avatar = avatarhash.avatarhash
  }
}

const actions = {
  addavatarhash ({ commit }, { avatarhash }) {
    commit('setavatarhash', { avatarhash })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}