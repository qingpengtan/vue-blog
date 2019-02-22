const nav = {
  state: {
    isActive: false,
    isTagActive: false
  },
  mutations: {
    IS_ACTIVE: (state, status) => {
      state.isActive = status
    },
    IS_TAG_ACTIVE: (state, status) => {
      state.isTagActive = status
    }
  },
  actions: {
    IsActive({
      commit
    }, status) {
      commit('IS_ACTIVE', status)
    },
    IsTagActive({
      commit
    }, status) {
      commit('IS_TAG_ACTIVE', status)
    }
  }
}

export default nav
