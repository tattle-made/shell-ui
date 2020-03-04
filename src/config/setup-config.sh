#!/bin/bash
echo 'Setting up Config based on environment'
echo $1

if [ "$1" == "DEVELOPMENT" ]
then
    cp src/config/config-dev.js src/config.js
fi

if [ "$1" == "PRODUCTION" ]
then
    cp src/config/config-prod.js src/config.js
fi


if [ "$1" == "LOCALHOST" ]
then
    cp src/config/config-local.js src/config.js
fi