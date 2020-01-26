export const state = () => ({
  filename: ''
})

export const getters = {}

export const mutations = {
  setFilename(state, filename) {
    state.filename = filename
  }
}

export const actions = {
  update({ commit }, filename) {
    commit('setFilename', filename)
  }
}
