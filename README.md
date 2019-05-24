# ParaView-Flow

This application aims to provide a live interface and tailored tools to look at ParFlow result unsing the ParaViewWeb framework.

## Run the application

```
$ npm run build
$ /.../pvpython ./server/pvw-flow.py --content ./dist --port 1234 --data /.../washita/washita.pfmetadata

Open your browser to http://localhost:1234/
```

Or you can live development

```
$ npm run serve
$ /.../pvpython --force-offscreen-rendering ./server/pvw-flow.py --port 1234 --data /.../washita/washita.pfmetadata

Open your browser to http://localhost:8080/
```

## Devs setup

```seb
export PV_HOME=/Applications/ParaView-5.6.0-1626-g52acf2f741.app/Contents
$PV_HOME/bin/pvpython               \
    --force-offscreen-rendering     \
    ./server/pvw-flow.py            \
    --port 1234                     \
    --content ./dist                \
    --data /Users/seb/Documents/code/Web/paraview-flow/data/examples/LW2/LW.out.pfmetadata


npm run serve
http://localhost:8080/?sessionURL=ws://localhost:1234/ws
```