docker build -t web .
docker tag -f web tutum.co/iteamdev/tutum-web
docker push tutum.co/iteamdev/tutum-web
