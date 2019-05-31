/* eslint-disable arrow-body-style */
export default function createMethods(session) {
  return {
    getState: () => session.call('pv.flow.state.get', []),
    resetCamera: (id) => session.call('flow.reset.camera', [id]),
    colorBy: (repId, field) => session.call('flow.color.by', [repId, field]),
    updateTime: (time) => session.call('flow.time.update', [time]),
    sliceSubSurface: (sliceIdx) =>
      session.call('flow.subsurface.slice.update', [sliceIdx]),
    updateColorMode: (name, value) =>
      session.call('flow.color.mode.update', [name, value]),
    rescaleColor: (name) => session.call('flow.color.rescale', [name]),
    showWaterTableDepth: (visibility) =>
      session.call('flow.water.table.show', [visibility]),
    updateWaterTableDepthScaling: (scale) =>
      session.call('flow.water.table.scale', [Number(scale)]),
    updateTimeAnimation: (playing) =>
      session.call('flow.time.animation.set', [playing]),
    getGlobalTimeWaterBalance: () => session.call('flow.water.balance.get', []),

    onAnimationState: (callback) =>
      session.subscribe('flow.animation.state', callback),
  };
}
