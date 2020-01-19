export const state = () => ({
  leftEntries: [],
  rightEntries: []
})

export const getters = {
  allEntries(state) {
    return state.leftEntries
  }
}

export const mutations = {
  setLeft(state, leftEntries) {
    state.leftEntries = leftEntries
  },
  setRight(state, rightEntries) {
    state.rightEntries = rightEntries
  }
}

export const actions = {
  loadLeft({ commit }, leftEntries) {
    commit('setLeft', leftEntries)
  },
  loadRight({ commit }, rightEntries) {
    commit('setRight', rightEntries)
  }
}
