# MyMetrics

https://medium.com/@jcbaey/your-nodejs-app-deserves-grafana-influxdb-and-statsd-f61d506bdb7e


##InfluxDB

#Telegraf
Telegraf feeds metrics into influxdb.
- implements a statsd interface
- Connect to datasources like MongoDB, MySQL 
- Collect system metrics like CPU, memory, I/O.

https://www.influxdata.com/time-series-platform/telegraf/

/etc/telegraf/telegraf.conf
nano /etc/telegraf/telegraf.conf -c

journalctl -u telegraf.service --since "2017-04-07"


# Basic StatsD commands

Increment a counter (decrement is not supported by Telegraf):
echo "meas.field:1|c" | nc -C -w 1 -u localhost 8125
Here |c is the type of the value, it stands for counter.

Report a value (gauge |g), can be absolute or relatif (+/-)
echo "meas.temp:62|g" | nc -C -w 1 -u localhost 8125
echo "meas.temp:+2|g" | nc -C -w 1 -u localhost 8125
echo "meas.temp:-3|g" | nc -C -w 1 -u localhost 8125
InfluxDB supports tags (contextual values associated to a field), for instance the server name that reports the value:
echo "meas.temp,server=myServer:62|g" | nc -C -w 1 -u localhost 8125


##Grafana
A website dashboard for monitoring/alerting; can connect to Influxdb
http://51.15.198.201:3000/login
http://metrics.hoertlehner.com:3000/login



