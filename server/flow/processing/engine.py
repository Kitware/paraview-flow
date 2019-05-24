import os, time, json

import flow.plugins
from flow.configs.colorMaps import applyColorMap, applyColorMode
from flow.processing.utils import histToArray

from paraview import simple, servermanager

# -----------------------------------------------------------------------------

class FlowEngine(object):

  def __init__(self, filepath = '.'):
    self.filepath = filepath

    self.time = 0.0
    self.surfaceColorMode = 0 # Local range
    self.subSurfaceColorMode = 0 # Local range

    self.viewSurface = simple.CreateRenderView(True)
    self.viewSurface.EnableRenderOnInteraction = 0
    self.viewSurface.OrientationAxesVisibility = 0
    self.viewSurface.Background = [0.9, 0.9, 0.9]
    self.viewSurface.InteractionMode = '2D'
    self.viewSurface.CameraParallelProjection = 1

    self.viewSubSurface = simple.CreateRenderView(True)
    self.viewSubSurface.EnableRenderOnInteraction = 0
    self.viewSubSurface.OrientationAxesVisibility = 0
    self.viewSubSurface.Background = [0.9, 0.9, 0.9]
    self.viewSubSurface.InteractionMode = '2D'
    self.viewSubSurface.CameraParallelProjection = 1

    self.reader = simple.ParFlowReader(FileName=filepath, DeflectTerrain=0)

    self.surfaceRepresentation = simple.Show(simple.OutputPort(self.reader, 1), self.viewSurface)
    self.surfaceRepresentation.SetScalarBarVisibility(self.viewSurface, True)
    # self.subSurfaceRepresentation = simple.Show(simple.OutputPort(self.reader, 0), self.viewSubSurface)

    self.reader.UpdatePipeline()
    self.voi = self.reader.GetClientSideObject().GetOutputDataObject(0).GetExtent()
    self.extractSubset = simple.ExtractSubset(Input=simple.OutputPort(self.reader, 0))
    self.subSurfaceRepresentation = simple.Show(self.extractSubset, self.viewSubSurface)
    # simple.ColorBy(self.subSurfaceRepresentation, ['CELLS', 'saturation'])
    self.subSurfaceRepresentation.Representation = 'Surface'



    simple.Render(self.viewSurface)
    simple.ResetCamera(self.viewSurface)
    self.viewSurface.CenterOfRotation = self.viewSurface.CameraFocalPoint

    simple.Render(self.viewSubSurface)
    simple.ResetCamera(self.viewSubSurface)
    self.viewSubSurface.CenterOfRotation = self.viewSubSurface.CameraFocalPoint

    self.animationScene = simple.GetAnimationScene()


  def getState(self):
    return {
      'voi': self.voi,
      'time': float(self.animationScene.AnimationTime),
      'times': [float(v) for v in self.reader.TimestepValues],
      'surface': {
        'view': self.viewSurface.GetGlobalIDAsString(),
        'representation': self.surfaceRepresentation.GetGlobalIDAsString(),
        'fields': [str(v) for v in self.reader.a2DGridArrays],
        'field': str(self.surfaceRepresentation.ColorArrayName[1]),
      },
      'subsurface': {
        'view': self.viewSubSurface.GetGlobalIDAsString(),
        'representation': self.subSurfaceRepresentation.GetGlobalIDAsString(),
        'fields': [str(v) for v in self.reader.a3DGridArrays],
        'field': str(self.subSurfaceRepresentation.ColorArrayName[1]),
      },
    }


  def colorBy(self, representation, field):
    view = self.viewSubSurface if representation == self.subSurfaceRepresentation else self.viewSurface
    representation.SetScalarBarVisibility(view, False)

    simple.ColorBy(representation, ['CELLS', field])
    applyColorMap(representation)

    representation.SetScalarBarVisibility(view, True)

    lut = simple.GetColorTransferFunction(field)
    colorBar = simple.GetScalarBar(lut, view)

    colorBar.Enabled = 1
    colorBar.Selectable = 0
    colorBar.AutoOrient = 0
    colorBar.AutomaticLabelFormat = 1
    colorBar.AddRangeLabels = 0
    colorBar.ScalarBarLength = 0.9
    colorBar.LabelColor = [0, 0, 0]
    colorBar.Position = [0.8, 0.05]
    colorBar.LockPosition = 1
    colorBar.Repositionable = 1
    colorBar.Resizable = 1
    colorBar.TitleColor = [0, 0, 0]


  def setTime(self, time):
    self.animationScene.AnimationTime = time
    self.time = float(self.animationScene.AnimationTime)
    return self.animationScene.AnimationTime


  def updateSubSurfaceSlice(self, sliceIdx):
    newVOI = [v for v in self.extractSubset.VOI]
    newVOI[4] = sliceIdx
    newVOI[5] = sliceIdx + 1
    self.extractSubset.VOI = newVOI


  def updateColorMode(self, name, value):
    applyColorMode(name, value)


  def rescaleColorRange(self, name):
    if name == 'surface':
      self.surfaceRepresentation.RescaleTransferFunctionToDataRange(False, True)
      print('rescale')

    if name == 'subsurface':
      self.subSurfaceRepresentation.RescaleTransferFunctionToDataRange(False, True)
