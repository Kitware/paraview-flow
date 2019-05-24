export default {
  state: {
    client: null,
  },
  getters: {
    PVW_CLIENT(state) {
      return state.client;
    },
  },
  mutations: {
    PVW_CLIENT_SET(state, value) {
      state.client = value;
    },
  },
  actions: {
    PVW_STATE({ state }) {
      return state.client.Flow.getState();
    },
    PVW_RESET_CAMERA({ state }, id = -1) {
      return state.client.Flow.resetCamera(id);
    },
    PVW_COLOR_BY({ state }, { id, field }) {
      return state.client.Flow.colorBy(id, field);
    },
    PVW_TIME_UPDATE({ state }, time) {
      return state.client.Flow.updateTime(time);
    },
    PVW_EXTRACT_SLICE({ state }, sliceIdx) {
      return state.client.Flow.sliceSubSurface(sliceIdx);
    },
    PVW_RESCALE_COLOR({ state }, name) {
      return state.client.Flow.rescaleColor(name);
    },
    PVW_UPDATE_COLOR_MODE({ state }, { name, value }) {
      return state.client.Flow.updateColorMode(name, value);
    },
  },
};
