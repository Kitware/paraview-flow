import { mapGetters } from 'vuex';

import SubSurfaceView from 'paraview-flow/src/components/core/SubSurfaceView';
import SurfaceView from 'paraview-flow/src/components/core/SurfaceView';

import { connectImageStream } from 'vtk.js/Sources/Rendering/Misc/RemoteView';

// ----------------------------------------------------------------------------
// Component API
// ----------------------------------------------------------------------------

export default {
  name: 'Content',
  components: {
    SubSurfaceView,
    SurfaceView,
  },
  data() {
    return {
      change: 0,
    };
  },
  computed: {
    ...mapGetters({
      client: 'NETWORK_CLIENT',
      viewAvailable: 'UI_VIEW_AVAILABLE',
    }),
  },
  mounted() {
    if (this.client) {
      connectImageStream(this.client.getConnection().getSession());
    }
    setTimeout(() => {
      this.change++;
    }, 1000);
  },
  watch: {
    viewAvailable() {
      this.change++;
    },
    client() {
      if (this.client) {
        connectImageStream(this.client.getConnection().getSession());
      }
    },
  },
};
