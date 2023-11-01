#!/bin/bash

BRANCH=main

cd /home/ec2-user/kr-gomi-settlement
git reset --hard
git pull origin $BRANCH

# front-api
if [[ $(pm2 list | grep front-client) ]]; then
  pm2 restart front-client
else
  pm2 start yarn --name "front-client" -- preview
fi

pm2 save