#!/bin/bash

BRANCH=main

cd /home/ec2-user/kr-gomi-settlement
git reset --hard
git fetch --all
git reset origin/$BRANCH --hard

# front-api
if [[ $(pm2 list | grep front-client) ]]; then
  pm2 restart front-client
else
  pm2 start yarn --name "front-client" -- preview
fi

# office-api
if [[ $(pm2 list | grep front-office) ]]; then
  pm2 restart front-office
else
  pm2 start yarn --name "front-office" -- preview
fi

pm2 save