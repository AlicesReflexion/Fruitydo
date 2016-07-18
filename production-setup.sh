#!/bin/bash
# Fruitydo Openshift setup script

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

setvars () {
app_name="$1"
rhc env set OPENSHIFT_PYTHON_WSGI_APPLICATION=wsgi/wsgi.py --app $app_name
rhc env set DEPENDENCY_BASE=$OPENSHIFT_HOMEDIR/app_root/dependencies --app $app_name
echo -e "${GREEN}wsgi and dependency directory set.${NC}"
echo -n "enter the SMTP hostname you'll be sending email from: "
read smtp_url
echo -n "enter the port you'll be sending from: "
read smtp_port
echo -n "enter the username: "
read smtp_username
echo -n "And finally, password: "
read smtp_password
rhc env set OPENSHIFT_SMTP_URL=$smtp_url --app $app_name
rhc env set OPENSHIFT_SMTP_PORT=$smtp_port --app $app_name
rhc env set OPENSHIFT_SMTP_LOGIN=$smtp_username --app $app_name
rhc env set OPENSHIFT_SMTP_PASSWROD=$smtp_password --app $app_name
echo -e "${GREEN}Openshift environment variables set. To continue, SSH onto your server and run this script there.${NC}"
exit 0
}

installnpm () {
  cd $DEPENDENCY_BASE
  wget -e robots=off -r -nd --no-parent -A "*-linux-x64.tar.xz" http://nodejs.org/dist/latest-v6.x/
  tar xf *.tar.xz
  rm *node*.tar.xz
  mv *node* node
  mkdir -p ./node_modules
  export NPM_CONFIG_USERCONFIG=$OPENSHIFT_HOMEDIR/app_root/build-dependencies/.npmrc
  export PATH="$DEPENDENCY_BASE/node_modules/.bin/:$DEPENDENCY_BASE/node/bin/:$PATH"
  npm config set cache "$DEPENDENCY_BASE/.npm"
  npm --prefix $DEPENDENCY_BASE install $OPENSHIFT_REPO_DIR
  echo -e "${GREEN}Successfully installed dependencies! You should now be able to run fruitydo on Openshift!${NC}"
  echo "${RED}If your server is NOT running correctly, you may have to restart the server, or push from your Git directory again.${NC}"
}

if [ -z "$DEPENDENCY_BASE" ]
  then
    if [ "$1" == "" ]
    then
      echo -e "${RED}No app name provided!${NC}"
      echo "Pass the name of the app for which you are setting up."
      echo "For example, ./production-setup.sh fruitydo"
      exit 1
    else
      setvars $1
    fi
  else
    installnpm
fi


