export default {
  state: {
    count: 0,
  },
  getters: {
    BUSY_COUNT(state) {
      return state.count;
    },
  },
  mutations: {
    BUSY_COUNT_SET(state, value) {
      state.count = value;
    },
  },
};
