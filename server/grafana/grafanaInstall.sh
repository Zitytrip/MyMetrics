#/bin/bash

# download / install grafana
# THIS IS THE OLD v4, where grafana did not support ARM. Now they do.
wget https://github.com/fg2it/grafana-on-raspberry/releases/download/v4.6.2/grafana_4.6.2_armhf.deb
sudo apt-get install -y adduser libfontconfig
sudo dpkg -i grafana_4.6.2_armhf.deb

# ON ARM
wget https://s3-us-west-2.amazonaws.com/grafana-releases/release/grafana_5.2.2_armhf.deb
sudo dpkg -i grafana_5.2.2_armhf.deb

# allow http server on port 80
sudo setcap CAP_NET_BIND_SERVICE=+eip /usr/sbin/grafana-server

# ON AMD
wget https://s3-us-west-2.amazonaws.com/grafana-releases/release/grafana_5.2.2_amd64.deb 
sudo dpkg -i grafana_5.2.2_amd64.deb 