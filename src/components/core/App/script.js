import Mousetrap from 'mousetrap';
import { mapGetters, mapMutations, mapActions } from 'vuex';

import vtkURLExtract from 'vtk.js/Sources/Common/Core/URLExtract';

import FlowToolbar from 'paraview-flow/src/components/core/Toolbar';
import FlowContent from 'paraview-flow/src/components/core/Content';

import shortcuts from 'paraview-flow/src/shortcuts';

const userParams = vtkURLExtract.extractURLParameters();

// ----------------------------------------------------------------------------
// Component API
// ----------------------------------------------------------------------------

export default {
  name: 'App',
  components: {
    FlowToolbar,
    FlowContent,
  },
  computed: {
    ...mapGetters({
      client: 'NETWORK_CLIENT',
    }),
  },
  data() {
    return {};
  },
  watch: {
    client() {
      // This only happen once when the connection is ready
      this.$store.dispatch('FLOW_INITIALIZE');
    },
  },
  methods: {
    ...mapMutations({
      updateNetworkConfig: 'NETWORK_CONFIG_SET',
    }),
    ...mapActions({
      connect: 'NETWORK_CONNECT',
    }),
  },
  mounted() {
    // Initiate network connection
    const config = Object.assign({}, userParams, {
      application: 'flow',
    });
    this.updateNetworkConfig(config);
    this.connect();

    // attach keyboard shortcuts
    shortcuts.forEach(({ key, action, event }) => {
      Mousetrap.bind(
        key,
        (e) => {
          e.preventDefault();
          this.$store.dispatch(action);
        },
        event
      );
    });
  },
  beforeDestroy() {
    shortcuts.forEach(({ key }) => {
      Mousetrap.unbind(key);
    });
  },
};
