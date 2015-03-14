docker build -t utmana-lb .
docker tag -f utmana-lb tutum.co/iteamdev/utmana-lb
docker push tutum.co/iteamdev/utmana-lb
