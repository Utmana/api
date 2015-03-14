docker build -t lb .
docker tag -f lb tutum.co/iteamdev/tutum-lb
docker push tutum.co/iteamdev/tutum-lb
