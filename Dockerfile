FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm -f /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

LABEL maintainer="RiverLake" \
      description="RiverLake Help Frontend" \
      version="1.0.0" \
      app="riverlake-help-frontend"

CMD ["nginx", "-g", "daemon off;"]
