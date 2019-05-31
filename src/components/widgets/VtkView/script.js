import vtkRemoteView from 'vtk.js/Sources/Rendering/Misc/RemoteView';

export default {
  name: 'VtkView',
  props: {
    viewId: {
      type: String,
      default: '-1',
    },
    client: {
      type: Object,
      default: null,
    },
    animating: {
      type: Boolean,
      default: false,
    },
    sizeChange: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      connected: false,
    };
  },
  created() {
    // eslint-disable-next-line
    this.view = vtkRemoteView.newInstance({ rpcWheelEvent: 'flow.zoom.wheel' });
    this.view.setInteractiveRatio(1); // Force full resolution even HiDPI screen
  },
  mounted() {
    this.view.setContainer(this.$el);
    this.view.resize();
    this.connect();
  },
  methods: {
    connect() {
      if (this.client) {
        const session = this.client.getConnection().getSession();
        this.view.setSession(session);
        this.view.setViewId(this.viewId);
        this.connected = true;
        this.view.render();
      }
    },
    onResize() {
      if (this.view && this.connected) {
        this.view.resize();
        this.view.render();
      }
    },
    onSizeChange() {
      this.view.resize();
      this.view.render();
    },
  },
  watch: {
    client() {
      this.connect();
    },
    viewId(id) {
      if (this.connected) {
        this.view.setViewId(id);
        this.view.render();
      }
    },
    animating(anim) {
      if (anim) {
        this.view.getViewStream().startInteraction();
      } else {
        this.view.getViewStream().endInteraction();
      }
    },
    sizeChange() {
      // Hack...
      this.view.getCanvasView().setSize(10, 10);
      this.view.render();
      this.onResize();
    },
  },
  beforeDestroy() {
    this.view.delete();
  },
};
