set -v


# Talk to the metadata server to get the project id
PROJECTID=$(curl -s "http://metadata.google.internal/computeMetadata/v1/project/project-id" -H "Metadata-Flavor: Google")
REPOSITORY="github_varunks99_fleet-management-system"

# Install logging monitor. The monitor will automatically pick up logs sent to
# syslog.
curl -s "https://storage.googleapis.com/signals-agents/logging/google-fluentd-install.sh" | bash
service google-fluentd restart &

# Install dependencies from apt
apt-get update
apt-get install -yq ca-certificates git build-essential supervisor nginx
apt install ufw

# Firewall and config for nginx
ufw allow 'Nginx Full'
cat >/etc/nginx/sites-enabled/default << EOF
server {
    listen 80;
    listen [::]:80;
    server_name _;
    root /var/www/html;
    index index.html;
    location / {
        try_files $uri$args $uri$args/ /index.html;
    }
}
EOF
systemctl reload nginx

# Install nodejs
mkdir /opt/nodejs
curl "https://nodejs.org/dist/latest/node-v16.3.0-linux-x64.tar.gz" | tar xvzf - -C /opt/nodejs --strip-components=1
ln -s /opt/nodejs/bin/node /usr/bin/node
ln -s /opt/nodejs/bin/npm /usr/bin/npm

# Get the application source code from the Google Cloud Repository.
# git requires $HOME and it's not set during the startup script.
mkdir /opt/app/fms
export HOME=/root
# Store manually generated git credentials
##########################################
# Replace with manually generated git credentials
# https://cloud.google.com/source-repositories/docs/authentication#manually-generated-credentials
##########################################
git clone https://source.developers.google.com/p/${PROJECTID}/r/${REPOSITORY} /opt/app/fms

# Obtain external IP address of the VM and replace it in the environment file of Angular
ExternalIP=$(curl -s http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/?recursive=true -H "Metadata-Flavor: Google" | grep -oP '(?<="externalIp":")[0-9\.]*')
sed -i 's,127.0.0.1,'"$ExternalIP"',' /opt/app/fms/src/environments/environment.prod.ts
# Install dependencies for client
cd /opt/app/fms
npm ci && npm run build

# Transfer the files from build folder to /var/www/html (default folder for nginx)
chmod -R 755 /var/www
cp -a /opt/app/fms/dist/fleet-client/. /var/www/html 

# Install dependencies for server
cd /opt/app/fms/server
npm install

# Create a nodeapp user. The application will run as this user.
useradd -m -d /home/nodeapp nodeapp
chown -R nodeapp:nodeapp /opt/app

# Configure supervisor to run the node app.
cat >/etc/supervisor/conf.d/node-app.conf << EOF
[program:nodeapp]
directory=/opt/app/fms/server
command=npm start
autostart=true
autorestart=true
user=nodeapp
environment=HOME="/home/nodeapp",USER="nodeapp",NODE_ENV="production"
stdout_logfile=syslog
stderr_logfile=syslog
EOF

supervisorctl reread
supervisorctl update

# Client should now be running through nginx
# Server should now be running under supervisor