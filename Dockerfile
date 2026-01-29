## build stage ##
FROM node:20.17.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --legacy-peer-deps
COPY . .
RUN npm run build

## run stage ##
FROM nginx:alpine AS run
WORKDIR /app
COPY ./reactjs-nginx-prod.conf /etc/nginx/nginx.conf
RUN addgroup -g 10001 nodejs && \
    adduser -D -u 10001 -G nodejs reactapp && \
    mkdir -p /var/cache/nginx && \
    chown -R reactapp:nodejs /var/cache/nginx && \
    rm -rf /etc/nginx/conf.d/default.conf && \
    mkdir -p /tmp/log/nginx && \
    touch /tmp/nginx.pid && \
    chown -R reactapp:nodejs /tmp/nginx.pid && \
    chown -R reactapp:nodejs /tmp/log/nginx && \
    chown -R reactapp:nodejs /etc/nginx/nginx.conf

COPY --chown=reactapp:nodejs --chmod=750 --from=build /app/build /app

USER reactapp
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
