cd mongodb
./start.sh
cd ../

docker pull dockerfile/nodejs
docker build -t meanwhile/web:latest .
docker stop webapp
docker rm -f webapp
docker run -p 3000:3000 --name webapp -v $(pwd)/environment:/home/nonroot/environment/src --link db:db_1 -t -i meanwhile/web 
#run the following to redirect the traffic coming to your port 80 to the port 3000 that tsatter owns
#iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000 
