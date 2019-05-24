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
    }),
    rescaleMode: {
      get() {
        return this.$store.getters.FLOW_SUBSURFACE_RESCALE_MODE;
      },
      set(v) {
        this.$store.commit('FLOW_SUBSURFACE_RESCALE_MODE_SET', v);
        this.$store.dispatch('FLOW_UPDATE_RESCALE_MODE');
      },
    },
  },
  methods: {
    ...mapActions({
      resetCamera: 'PVW_RESET_CAMERA',
      updateColorBy: 'FLOW_UPDATE_COLOR',
      updateSliceIdx: 'FLOW_UPDATE_SLICE',
    }),
  },
};
