FROM nginx:1.17.0-alpine

WORKDIR /usr/share/nginx/html

RUN apk add --no-cache bash && \
    rm -rf /etc/nginx/conf.d

COPY .build/deploy/conf /etc/nginx
COPY .build/deploy/start.sh /start.sh
COPY .env dist ./

RUN chmod +x /start.sh

CMD ["/bin/bash", "-c", "/start.sh && nginx -g \"daemon off;\""]
