#/bin/bash

# download / install grafana
wget https://github.com/fg2it/grafana-on-raspberry/releases/download/v4.6.2/grafana_4.6.2_armhf.deb
sudo apt-get install -y adduser libfontconfig
sudo dpkg -i grafana_4.6.2_armhf.deb
