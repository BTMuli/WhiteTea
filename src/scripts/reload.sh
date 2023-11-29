#!/usr/bin/env bash
forever stop 0
forever start -c "bun ./src/index.ts" ./