const app = {
    state: {
      requestLoading: 0,
      showAreaId:''
    },
    mutations: {
      SET_LOADING: (state, status) => {
        // error 的时候直接重置
        if (status === 0) {
          state.requestLoading = 0
          return
        }
        state.requestLoading = status ? ++state.requestLoading : --state.requestLoading
      },
      SHOW_AREA_ID:(state, status) => {
        state.showAreaId = status
      }
    },
    actions: {
      SetLoading ({ commit }, status) {
        commit('SET_LOADING', status)
      },
      ShowAreaId({ commit }, status) {
        commit('SHOW_AREA_ID', status)
      },
    }
  }
  
  export default app
  