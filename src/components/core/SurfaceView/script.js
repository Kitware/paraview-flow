import { mapGetters, mapActions } from 'vuex';

import VtkView from 'paraview-flow/src/components/widgets/VtkView';

// ----------------------------------------------------------------------------
// Component API
// ----------------------------------------------------------------------------

export default {
  name: 'SurfaceView',
  components: {
    VtkView,
  },
  props: {
    layoutChange: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters({
      client: 'NETWORK_CLIENT',
      state: 'FLOW_SURFACE',
      colorModes: 'FLOW_COLOR_MODES',
    }),
    colorMode: {
      get() {
        return this.$store.getters.FLOW_COLOR_MODE_SURFACE;
      },
      set(value) {
        this.$store.commit('FLOW_COLOR_MODE_SURFACE_SET', value);
        this.$store.dispatch('FLOW_UPDATE_COLOR_MODE', {
          name: 'surface',
          value,
        });
      },
    },
  },
  methods: {
    ...mapActions({
      resetCamera: 'PVW_RESET_CAMERA',
      updateColorBy: 'FLOW_UPDATE_COLOR',
      colorRescale: 'FLOW_RESCALE_COLOR',
    }),
    activateColorMode(e) {
      this.colorMode = Number(e.currentTarget.dataset.value);
    },
  },
};
