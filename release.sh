#!/bin/sh
nmp ci
cd ./client
npm ci
cd ..
npm run build