## build stage ##
FROM node:20.17.0-alpine AS build
WORKDIR /app
COPY package*.json . 
RUN npm install
COPY . . 
RUN npm run build

## run stage ##
FROM nginx:alpine
WORKDIR /app
COPY ./reactjs-nginx-prod.conf /etc/nginx/nginx.conf
RUN addgroup -g 10001 nodejs && \
    adduser -D -u 10001 -G nodejs reactapp && \
    mkdir -p /var/cache/nginx && \
    chown -R reactapp:nodejs /var/cache/nginx && \
    mkdir -p /tmp/log/nginx && \
    touch /tmp/nginx.pid && \
    chown -R reactapp:nodejs /tmp/nginx.pid && \
    chown -R reactapp:nodejs /tmp/log/nginx

COPY --from=build /app/build .
RUN chown -R reactapp:nodejs /app && \
    chmod -R 750 /app

USER reactapp
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
