import vtkPiecewiseGaussianWidget from 'vtk.js/Sources/Interaction/Widgets/PiecewiseGaussianWidget';

// ----------------------------------------------------------------------------
// Helper method
// ----------------------------------------------------------------------------

function normalize(bins, yOffsetPercent = 0) {
  let maxCount = 0;
  let minCount = bins[0];
  for (let i = 0; i < bins.length; i++) {
    if (bins[i] > maxCount) {
      maxCount = bins[i];
    }
    if (bins[i] < minCount) {
      minCount = bins[i];
    }
  }
  const delta = maxCount - minCount;
  const offset = minCount;
  const scale = 1 - yOffsetPercent;
  return bins.map((v) => (scale * (v - offset)) / delta + yOffsetPercent);
}

// ----------------------------------------------------------------------------
// Component API
// ----------------------------------------------------------------------------

export default {
  name: 'Chart',
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    idx: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 256,
    },
    height: {
      type: Number,
      default: 100,
    },
    bins: {
      type: Array,
      default: [0, 0],
    },
    normalize: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      if (!this.$el) {
        return;
      }
      const ctx = this.$el.querySelector('canvas').getContext('2d');
      if (ctx) {
        const bins = this.normalize ? normalize(this.bins) : this.bins;
        ctx.clearRect(0, 0, this.width, this.height);
        vtkPiecewiseGaussianWidget.drawChart(
          ctx,
          [0, 0, this.width, this.height],
          bins,
          {
            lineWidth: 1,
            strokeStyle: '#333',
            fillStyle: 'rgba(0,0,0,0.25)',
          }
        );
        ctx.strokeStyle = '#64B5F6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const t = Math.round((this.idx / this.bins.length) * this.width);
        ctx.moveTo(t, 0);
        ctx.lineTo(t, this.height);
        ctx.stroke();
      }
    },
  },
  watch: {
    idx() {
      this.$nextTick(this.drawChart);
    },
    bins() {
      this.$nextTick(this.drawChart);
    },
    width() {
      this.$nextTick(this.drawChart);
    },
    height() {
      this.$nextTick(this.drawChart);
    },
  },
};
