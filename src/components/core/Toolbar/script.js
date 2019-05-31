import { mapGetters, mapMutations, mapActions } from 'vuex';

import logo from 'paraview-flow/src/assets/paraview-flow.svg';

// ----------------------------------------------------------------------------
// Component API
// ----------------------------------------------------------------------------

export default {
  name: 'Toolbar',
  data() {
    return {
      logo,
    };
  },
  computed: {
    ...mapGetters({
      busyCount: 'BUSY_COUNT',
      networkConfig: 'NETWORK_CONFIG',
      viewAvailable: 'UI_VIEW_AVAILABLE',
      time: 'FLOW_TIME',
      timeMin: 'FLOW_TIME_FIRST',
      timeMax: 'FLOW_TIME_LAST',
      waterTableDepthScaling: 'FLOW_WATER_TABLE_SCALING',
      playing: 'FLOW_PLAYING',
    }),
    waterTableDepth() {
      return ~this.viewAvailable.indexOf('water-table-depth');
    },
    showWaterBalance() {
      return ~this.viewAvailable.indexOf('water-balance');
    },
    lastFrame() {
      return this.time === this.timeMax;
    },
  },
  watch: {
    waterTableDepth(v) {
      this.$store.dispatch('PVW_SHOW_WATER_TABLE_DEPTH', v);
    },
    showWaterBalance(v) {
      if (v) {
        this.$store.dispatch('FLOW_FETCH_WATER_BALANCE');
      }
    },
  },
  methods: {
    ...mapMutations({
      updateViewAvailable: 'UI_VIEW_AVAILABLE_SET',
    }),
    ...mapActions({
      updateTime: 'FLOW_UPDATE_TIME',
      updateWaterTableDepthScaling: 'FLOW_UPDATE_WATER_TABLE_SCALING',
      updatePlaying: 'FLOW_UPDATE_TIME_ANIMATION',
    }),
    togglePlay() {
      if (this.lastFrame) {
        this.updateTime(this.timeMin);
      } else {
        this.updatePlaying(!this.playing);
      }
    },
  },
};
