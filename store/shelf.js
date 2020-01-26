import Vue from 'vue'

export const state = () => ({
  entrySet: {}
})

export const getters = {
  allEntries(state) {
    return Object.entries(state.entrySet).map(([k, v]) => {
      return { name: k, ...v }
    })
  }
}

export const mutations = {
  setLeft(state, leftEntries) {
    for (const eL of leftEntries) {
      const { name, dataURL } = eL
      const e = state.entrySet[name]
      Vue.set(state.entrySet, name, { ...e, 'dataURL-L': dataURL })
    }
  },
  setRight(state, rightEntries) {
    for (const eR of rightEntries) {
      const { name, dataURL } = eR
      const e = state.entrySet[name]
      Vue.set(state.entrySet, name, { ...e, 'dataURL-R': dataURL })
    }
  },
  setDiffOne(state, diffEntry) {
    const { name, width, height, dataURL, mismatchedPixels } = diffEntry
    const e = state.entrySet[name]
    Vue.set(state.entrySet, name, {
      ...e,
      width,
      height,
      'dataURL-D': dataURL,
      mismatchedPixels
    })
  }
}

export const actions = {
  loadLeft({ commit }, leftEntries) {
    commit('setLeft', leftEntries)
  },
  loadRight({ commit }, rightEntries) {
    commit('setRight', rightEntries)
  },
  loadDiff({ commit }, diffEntry) {
    commit('setDiffOne', diffEntry)
  }
}
