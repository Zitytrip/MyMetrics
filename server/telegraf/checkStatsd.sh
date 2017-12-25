#/bin/bash

# checks if telegraf is running with the statsd interface on prot 8125

netstat -lntu | grep 8125
