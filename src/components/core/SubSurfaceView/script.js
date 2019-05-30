import { mapGetters, mapActions } from 'vuex';

import VtkView from 'paraview-flow/src/components/widgets/VtkView';

// ----------------------------------------------------------------------------
// Component API
// ----------------------------------------------------------------------------

export default {
  name: 'SubSurfaceView',
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
      state: 'FLOW_SUBSURFACE',
      voi: 'FLOW_VOI',
      sliceIdx: 'FLOW_SLICE_IDX',
      colorModes: 'FLOW_COLOR_MODES',
    }),
    colorMode: {
      get() {
        return this.$store.getters.FLOW_COLOR_MODE_SUBSURFACE;
      },
      set(value) {
        this.$store.commit('FLOW_COLOR_MODE_SUBSURFACE_SET', value);
        this.$store.dispatch('FLOW_UPDATE_COLOR_MODE', {
          name: 'subsurface',
          value,
        });
      },
    },
  },
  methods: {
    ...mapActions({
      resetCamera: 'PVW_RESET_CAMERA',
      updateColorBy: 'FLOW_UPDATE_COLOR',
      updateSliceIdx: 'FLOW_UPDATE_SLICE',
      colorRescale: 'FLOW_RESCALE_COLOR',
    }),
    activateColorMode(e) {
      this.colorMode = Number(e.currentTarget.dataset.value);
    },
  },
};
