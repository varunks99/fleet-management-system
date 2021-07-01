set -v

# Talk to the metadata server to get the project id
PROJECTID=$(curl -s "http://metadata.google.internal/computeMetadata/v1/project/project-id" -H "Metadata-Flavor: Google")
REPOSITORY="github_varunks99_fleet-management-system"

##########################################
# Replace with manually generated git credentials
# https://cloud.google.com/source-repositories/docs/authentication#manually-generated-credentials
##########################################

rm -rf /opt/app/fms
git clone https://source.developers.google.com/p/${PROJECTID}/r/${REPOSITORY} /opt/app/fms

# Install dependencies for client
cd /opt/app/fms/client
npm ci && npm run build
# Transfer the files from build folder to /var/www/html (default folder for nginx)
rm -rf /var/www/html/*
cp -a /opt/app/fms/client/dist/fleet-client/. /var/www/html 

# Update server
cd /opt/app/fms/server
npm install
supervisorctl restart nodeapp