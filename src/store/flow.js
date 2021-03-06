function networkDebounce(pvwAction) {
  let pendingRequest = 0;
  let lastArgs = null;
  function debounce(dispatch, args) {
    pendingRequest++;
    lastArgs = args;
    if (pendingRequest === 1) {
      return dispatch(pvwAction, lastArgs)
        .then(() => {
          pendingRequest--;
          if (pendingRequest) {
            pendingRequest = 0;
            return debounce(dispatch, lastArgs);
          }
        })
        .catch(() => {
          pendingRequest = 0;
        });
    }
  }
  return debounce;
}

// ----------------------------------------------------------------------------

const debounceUpdateTime = networkDebounce('PVW_TIME_UPDATE');
const debounceSlice = networkDebounce('PVW_EXTRACT_SLICE');
const debounceGlyphScale = networkDebounce('PVW_UPDATE_WATER_TABLE_SCALING');

// ----------------------------------------------------------------------------

export default {
  state: {
    playing: false,
    subsurface: {},
    surface: {},
    time: 0,
    times: [0, 1],
    voi: [0, 1, 0, 1, 0, 1],
    sliceIdx: 0,
    colorModes: [
      { text: 'Never', value: -1 },
      { text: "Grow and update on 'Apply'", value: 0 },
      { text: 'Grow and update every timestep', value: 1 },
      { text: "Update on 'Apply'", value: 2 },
      { text: 'Clamp and update every timestep', value: 3 },
    ],
    colorModeSurface: -1,
    colorModeSubSurface: -1,
    waterTableDepthScaling: 500,
    waterBalance: null,
  },
  getters: {
    FLOW_PLAYING(state) {
      return state.playing;
    },
    FLOW_SURFACE(state) {
      return state.surface;
    },
    FLOW_SUBSURFACE(state) {
      return state.subsurface;
    },
    FLOW_TIME(state) {
      return state.time;
    },
    FLOW_TIMES(state) {
      return state.times;
    },
    FLOW_TIME_FIRST(state) {
      return state.times[0];
    },
    FLOW_TIME_LAST(state) {
      return state.times[state.times.length - 1];
    },
    FLOW_VOI(state) {
      return state.voi;
    },
    FLOW_SLICE_IDX(state) {
      return state.sliceIdx;
    },
    FLOW_COLOR_MODES(state) {
      return state.colorModes;
    },
    FLOW_COLOR_MODE_SURFACE(state) {
      return state.colorModeSurface;
    },
    FLOW_COLOR_MODE_SUBSURFACE(state) {
      return state.colorModeSubSurface;
    },
    FLOW_WATER_TABLE_SCALING(state) {
      return state.waterTableDepthScaling;
    },
    FLOW_WATER_BALANCE(state) {
      return state.waterBalance;
    },
  },
  mutations: {
    FLOW_PLAYING_SET(state, value) {
      state.playing = value;
    },
    FLOW_SURFACE_SET(state, value) {
      state.surface = value;
    },
    FLOW_SUBSURFACE_SET(state, value) {
      state.subsurface = value;
    },
    FLOW_TIME_SET(state, value) {
      state.time = value;
    },
    FLOW_TIMES_SET(state, value) {
      state.times = value;
    },
    FLOW_VOI_SET(state, value) {
      state.voi = value;
    },
    FLOW_SLICE_IDX_SET(state, value) {
      state.sliceIdx = value;
    },
    FLOW_COLOR_MODES_SET(state, value) {
      state.colorModes = value;
    },
    FLOW_COLOR_MODE_SURFACE_SET(state, value) {
      state.colorModeSurface = value;
    },
    FLOW_COLOR_MODE_SUBSURFACE_SET(state, value) {
      state.colorModeSubSurface = value;
    },
    FLOW_WATER_TABLE_SCALING_SET(state, value) {
      state.waterTableDepthScaling = value;
    },
    FLOW_WATER_BALANCE_SET(state, value) {
      state.waterBalance = value;
    },
  },
  actions: {
    FLOW_INITIALIZE({ dispatch, commit }) {
      dispatch('PVW_STATE').then((serverState) => {
        commit('FLOW_SURFACE_SET', serverState.surface);
        commit('FLOW_SUBSURFACE_SET', serverState.subsurface);
        commit('FLOW_TIME_SET', serverState.time);
        commit('FLOW_TIMES_SET', serverState.times);
        commit('FLOW_VOI_SET', serverState.voi);
        commit('FLOW_SLICE_IDX_SET', serverState.voi[5] - 1);
      });
    },
    FLOW_UPDATE_COLOR({ dispatch, state }, { name, field }) {
      const id = state[name].representation;
      dispatch('PVW_COLOR_BY', { id, field }).then((newField) => {
        state[name].field = newField;
      });
    },
    FLOW_UPDATE_TIME({ commit, dispatch }, time) {
      commit('FLOW_TIME_SET', Number(time));
      debounceUpdateTime(dispatch, Number(time));
    },
    FLOW_UPDATE_SLICE({ commit, dispatch }, sliceIdx) {
      commit('FLOW_SLICE_IDX_SET', sliceIdx);
      debounceSlice(dispatch, sliceIdx);
    },
    FLOW_TIME_NEXT({ getters, commit, dispatch }) {
      const cTime = getters.FLOW_TIME;
      const lastTime = getters.FLOW_TIME_LAST;
      if (cTime < lastTime) {
        commit('FLOW_TIME_SET', cTime + 1);
        debounceUpdateTime(dispatch, cTime + 1);
      }
    },
    FLOW_TIME_PREVIOUS({ getters, commit, dispatch }) {
      const cTime = getters.FLOW_TIME;
      const firstTime = getters.FLOW_TIME_FIRST;
      if (cTime > firstTime) {
        commit('FLOW_TIME_SET', cTime - 1);
        debounceUpdateTime(dispatch, cTime - 1);
      }
    },
    FLOW_LAYER_UP({ getters, commit, dispatch }) {
      const idx = getters.FLOW_SLICE_IDX;
      const max = getters.FLOW_VOI[5] - 1;
      if (idx < max) {
        commit('FLOW_SLICE_IDX_SET', idx + 1);
        debounceSlice(dispatch, idx + 1);
      }
    },
    FLOW_LAYER_DOWN({ getters, commit, dispatch }) {
      const idx = getters.FLOW_SLICE_IDX;
      const min = getters.FLOW_VOI[4];
      if (idx > min) {
        commit('FLOW_SLICE_IDX_SET', idx - 1);
        debounceSlice(dispatch, idx - 1);
      }
    },
    FLOW_UPDATE_RESCALE_MODE({ getters, dispatch }) {
      dispatch('PVW_UPDATE_RESCALE_MODE', {
        surface: getters.FLOW_SURFACE_RESCALE_MODE,
        subSurface: getters.FLOW_SUBSURFACE_RESCALE_MODE,
      });
    },
    FLOW_UPDATE_COLOR_MODE({ dispatch }, { name, value }) {
      dispatch('PVW_UPDATE_COLOR_MODE', { name, value });
    },
    FLOW_RESCALE_COLOR({ dispatch }, name) {
      dispatch('PVW_RESCALE_COLOR', name);
    },
    FLOW_UPDATE_WATER_TABLE_SCALING({ commit, dispatch }, scale) {
      commit('FLOW_WATER_TABLE_SCALING_SET', scale);
      debounceGlyphScale(dispatch, scale);
    },
    FLOW_UPDATE_TIME_ANIMATION({ commit, dispatch }, animate) {
      commit('FLOW_PLAYING_SET', animate);
      dispatch('PVW_UPDATE_TIME_ANIMATION', animate);
    },
    FLOW_FETCH_WATER_BALANCE({ state, commit, dispatch }) {
      if (!state.waterBalance) {
        dispatch('PVW_WATER_BALANCE').then((wb) => {
          commit('FLOW_WATER_BALANCE_SET', wb);
        });
      }
    },
  },
};
