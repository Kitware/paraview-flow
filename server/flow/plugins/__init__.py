import os
from paraview import simple

# -----------------------------------------------------------------------------

MODULE_PATH = os.path.dirname(os.path.abspath(__file__))

PLUGINS = [
    'parflow.py'
]

DISTRIBUTED_PLUGINS = [
    'ParFlow',
]

# -----------------------------------------------------------------------------
# Load the plugins
# -----------------------------------------------------------------------------

for plugin in PLUGINS:
  simple.LoadPlugin(os.path.join(MODULE_PATH, plugin))

for plugin in DISTRIBUTED_PLUGINS:
  simple.LoadDistributedPlugin(plugin)
