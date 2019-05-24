#!/bin/bash
set -ev

npm run lint
npm run build
git config --global user.name "Travis CI"
git config --global user.email "sebastien.jourdain@kitware.com"
export GIT_PUBLISH_URL=https://${GH_TOKEN}@github.com/Kitware/paraview-flow.git
npm run semantic-release
#npm run doc:publish
