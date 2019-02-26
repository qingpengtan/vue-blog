const scroll = {
    state: {
      indexScroll: 0,
      classScrll: 0,
    },
    mutations: {
      INDEX_SCROLL: (state, status) => {
        state.indexScroll = status
      },
      CLASS_SCROLL: (state, status) => {
        state.classScrll = status
      },
    },
    actions: {
      IndexScroll({
        commit
      }, status) {
        commit('INDEX_SCROLL', status)
      },
      ClassScroll({
        commit
      }, status) {
        commit('CLASS_SCROLL', status)
      }
    }
  }
  
  export default scroll