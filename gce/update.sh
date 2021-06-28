set -v

# Talk to the metadata server to get the project id
PROJECTID=$(curl -s "http://metadata.google.internal/computeMetadata/v1/project/project-id" -H "Metadata-Flavor: Google")
REPOSITORY="github_varunks99_fleet-management-system"

eval 'set +o history' 2>/dev/null || setopt HIST_IGNORE_SPACE 2>/dev/null
 touch ~/.gitcookies
 chmod 0600 ~/.gitcookies

 git config --global http.cookiefile ~/.gitcookies

 tr , \\t <<\__END__ >>~/.gitcookies
source.developers.google.com,FALSE,/,TRUE,2147483647,o,git-varun-kevin.shiri.1.ens.etsmtl.ca=1//0fxyDXACCMaWyCgYIARAAGA8SNwF-L9Ir5YZ_-FUk2L2yvrFcqn2jJO_38MrOSNJ7kW8Q66rQn9V4V6mOzsbjV8xHCVllFBfX-O4
__END__
eval 'set -o history' 2>/dev/null || unsetopt HIST_IGNORE_SPACE 2>/dev/null

rm -r /opt/app/fms/*
git clone https://source.developers.google.com/p/${PROJECTID}/r/${REPOSITORY} /opt/app/fms

# Obtain external IP address of the VM and replace it in the environment file of Angular
ExternalIP=$(curl -s http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/?recursive=true -H "Metadata-Flavor: Google" | grep -oP '(?<="externalIp":")[0-9\.]*')
sed -i 's,127.0.0.1,'"$ExternalIP"',' /opt/app/fms/src/environments/environment.prod.ts
# Install dependencies for client
cd /opt/app/fms
npm ci && npm run build
# Transfer the files from build folder to /var/www/html (default folder for nginx)
rm -r /var/www/html/*
cp -a /opt/app/fms/dist/fleet-client/. /var/www/html 

# Update server
cd /opt/app/fms/server
npm install
supervisorctl restart nginx