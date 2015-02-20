docker stop db
docker rm -f db
docker run --name db -p 27017:27017 -d mongo
