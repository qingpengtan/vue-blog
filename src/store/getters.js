const getters = {
    requestLoading: state => state.app.requestLoading,
    isActive: state => state.nav.isActive,
    isTagActive: state => state.nav.isTagActive,
    indexScroll: state => state.scroll.indexScroll,
    classScrll: state => state.scroll.classScrll,
}

export default getters