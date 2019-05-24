// Import polyfills
import 'core-js/modules/es7.promise.finally';
import 'core-js/modules/web.immediate';

import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

// eslint-disable-next-line
import store from 'paraview-flow/src/store';

// eslint-disable-next-line
import App from 'paraview-flow/src/components/core/App';

// eslint-disable-next-line
import 'typeface-roboto';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuex);
Vue.use(Vuetify, {
  iconfont: 'mdi',
  icons: {
    // -------------------------------
    // Toolbar
    // -------------------------------
    time: 'mdi-clock-outline',
    colorMap: 'mdi-invert-colors',
    surface: 'mdi-image-filter-drama',
    subSurface: 'mdi-layers',
    waterTable: 'mdi-water',
    waterBalance: 'mdi-scale-balance',
    localRescale: 'mdi-ruler',
    globalRescale: 'mdi-ruler-square',
    // -------------------------------
    // View toolbar
    // -------------------------------
    resetCamera: 'mdi-crop-free',
    selected: 'mdi-radiobox-marked',
    unselected: 'mdi-radiobox-blank',
    rescaleColor: 'mdi-ruler',
  },
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
