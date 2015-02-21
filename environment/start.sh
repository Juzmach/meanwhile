#!/bin/sh
while ! curl http://db_1:27017
do
  echo "$(date) - still trying - this takes something like 30 - 60 seconds"
  sleep 1
done
echo "$(date) - connected successfully"
mkdir -p src/public/libs
cp -r bower_components/* src/public/libs/
ls src/public/libs/jquery/dist
cd src
npm start

