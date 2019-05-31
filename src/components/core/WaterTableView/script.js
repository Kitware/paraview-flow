import { mapGetters } from 'vuex';

import Chart from 'paraview-flow/src/components/widgets/Chart';

// ----------------------------------------------------------------------------
// Component API
// ----------------------------------------------------------------------------

export default {
  name: 'Table',
  components: {
    Chart,
  },
  data() {
    return {
      width: 100,
      chartHeight: 200,
    };
  },
  computed: {
    ...mapGetters({
      time: 'FLOW_TIME',
      waterBalance: 'FLOW_WATER_BALANCE',
    }),
    chartWidth() {
      return Math.floor(this.width / 3);
    },
    surfaceStorage() {
      return (
        (this.waterBalance && this.waterBalance['surface storage']) || [0, 1]
      );
    },
    subSurfaceStorage() {
      return (
        (this.waterBalance && this.waterBalance['subsurface storage']) || [0, 1]
      );
    },
    surfaceRunOff() {
      return (
        (this.waterBalance && this.waterBalance['surface runoff']) || [0, 1]
      );
    },
  },
  mounted() {
    this.onResize();
  },
  methods: {
    onResize() {
      if (this.$el && this.$el.getBoundingClientRect) {
        const { width, height } = this.$el.getBoundingClientRect();
        this.width = width;
        this.chartHeight = Math.floor(height - 35);
      }
    },
  },
};
