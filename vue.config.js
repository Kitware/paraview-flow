const vtkChainWebpack = require('vtk.js/Utilities/config/chainWebpack');

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  chainWebpack: (config) => {
    // Add project name as alias
    config.resolve.alias.set('paraview-flow', __dirname);

    // Add vtk.js rules
    vtkChainWebpack(config);
  },
};
