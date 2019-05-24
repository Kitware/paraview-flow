export default {
  state: {
    alt: false,
    shift: false,
    ctrl: false,
  },
  getters: {
    KEY_ALT(state) {
      return state.alt;
    },
    KEY_SHIFT(state) {
      return state.shift;
    },
    KEY_CTRL(state) {
      return state.ctrl;
    },
  },
  mutations: {
    KEY_ALT_SET(state, value) {
      state.alt = value;
    },
    KEY_SHIFT_SET(state, value) {
      state.shift = value;
    },
    KEY_CTRL_SET(state, value) {
      state.ctrl = value;
    },
  },
  actions: {
    KEY_ALT_ON({ commit }) {
      commit('KEY_ALT_SET', true);
    },
    KEY_ALT_OFF({ commit }) {
      commit('KEY_ALT_SET', false);
    },
    KEY_SHIFT_ON({ commit }) {
      commit('KEY_SHIFT_SET', true);
    },
    KEY_SHIFT_OFF({ commit }) {
      commit('KEY_SHIFT_SET', false);
    },
    KEY_CTRL_ON({ commit }) {
      commit('KEY_CTRL_SET', true);
    },
    KEY_CTRL_OFF({ commit }) {
      commit('KEY_CTRL_SET', false);
    },
  },
};
