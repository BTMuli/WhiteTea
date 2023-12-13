#!/usr/bin/env bash
forever start -a -l ../Code/logs/forever.log -o ../Code/logs/out.log -e ../Code/logs/err.log -v -c "bun ./src/index.ts" ./