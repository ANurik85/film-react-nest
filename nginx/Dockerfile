FROM nginx:stable-alpine

RUN mkdir -p /var/www/certbot

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf
