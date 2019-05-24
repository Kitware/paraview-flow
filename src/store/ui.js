export default {
  state: {
    drawer: false,
    viewAvailable: ['surface'],
  },
  getters: {
    UI_DRAWER(state) {
      return state.drawer;
    },
    UI_VIEW_AVAILABLE(state) {
      return state.viewAvailable;
    },
  },
  mutations: {
    UI_DRAWER_SET(state, value) {
      state.drawer = value;
    },
    UI_VIEW_AVAILABLE_SET(state, value) {
      state.viewAvailable = value;
    },
  },
  actions: {
    UI_TOGGLE_DRAWER_VISIBILITY({ state, commit }) {
      commit('UI_DRAWER_SET', !state.drawer);
    },
  },
};
