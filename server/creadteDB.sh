echo "telegraph database..."
influx -execute "CREATE DATABASE telegraf" 
influx -execute "CREATE RETENTION POLICY six_month_only ON telegraf DURATION 26w REPLICATION 1 DEFAULT"

# Define a read/write user
echo telegraph all permission user
influx -database telegraf -execute "CREATE USER telegraf WITH PASSWORD 'regenschirm13' "
influx -database telegraf -execute "GRANT ALL ON telegraf TO telegraf"
influx -database telegraf -execute "SHOW GRANTS FOR telegraf"

# Define a read only user
echo grafana read user
influx -database telegraf -execute "CREATE USER grafana WITH PASSWORD 'regenschirm13'"
influx -database telegraf -execute "GRANT READ ON telegraf TO grafana"
influx -database telegraf -execute "SHOW GRANTS FOR grafana"
# exit
