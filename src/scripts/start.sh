#!/usr/bin/env bash
forever start -c "node --loader ts-node/esm ./src/index.ts" ./