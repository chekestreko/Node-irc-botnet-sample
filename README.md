# Node-irc-botnet-sample

#put and configure your server in config.json

#Install all dependecies

apt-get install screen
apt-get install nodejs
npm init
npm install irc
npm install child_process

#Run bot

screen -dmS bot_node ./app.js
