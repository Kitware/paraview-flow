// import Vue from 'vue';
import Vuex from 'vuex';

import busy from 'paraview-flow/src/store/busy';
import flow from 'paraview-flow/src/store/flow';
import keys from 'paraview-flow/src/store/keys';
import network from 'paraview-flow/src/store/network';
import pvw from 'paraview-flow/src/store/pvw';
import ui from 'paraview-flow/src/store/ui';

/* eslint-enable no-param-reassign */

function createStore() {
  return new Vuex.Store({
    modules: {
      busy,
      flow,
      keys,
      network,
      pvw,
      ui,
    },
  });
}

export default createStore;
