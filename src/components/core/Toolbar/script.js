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
    }),
    waterTableDepth() {
      return ~this.viewAvailable.indexOf('water-table-depth');
    },
  },
  watch: {
    waterTableDepth(v) {
      this.$store.dispatch('PVW_SHOW_WATER_TABLE_DEPTH', v);
    },
  },
  methods: {
    ...mapMutations({
      updateViewAvailable: 'UI_VIEW_AVAILABLE_SET',
    }),
    ...mapActions({
      updateTime: 'FLOW_UPDATE_TIME',
    }),
  },
};
