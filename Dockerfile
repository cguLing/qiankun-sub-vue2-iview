FROM nginx
WORKDIR /usr/src/app
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# COPY ./nginx-compose.conf /etc/nginx/conf.d/default.conf
COPY ./dist dist