#!/usr/bin/env bash
forever stop 0
forever start -c "node --loader ts-node/esm ./src/index.ts" ./