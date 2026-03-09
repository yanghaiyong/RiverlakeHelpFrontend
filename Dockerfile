FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm -f /etc/nginx/conf.d/default.conf && \
    mkdir -p /var/cache/nginx/client_temp /var/cache/nginx/proxy_temp /var/cache/nginx/fastcgi /var/cache/nginx/uwsgi /var/cache/nginx/scgi && \
    chown -R nginx:nginx /var/cache/nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENV API_BASE_URL=/api
ENV APP_TITLE=RiverLake\ Help
ENV APP_VERSION=1.0.0

LABEL maintainer="RiverLake" \
      description="RiverLake Help Frontend" \
      version="1.0.0" \
      app="riverlake-help-frontend"

USER nginx

CMD ["sh", "-c", "envsubst < /etc/nginx/conf.d/default.conf > /tmp/default.conf && mv /tmp/default.conf /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
