# Build
FROM node:20-alpine as build

RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

COPY package*.json ./

RUN pnpm import
RUN pnpm install

COPY . .

RUN pnpm run build

# Stage 2
FROM nginx:1.27.2-alpine

COPY --from=build /app/dist/ /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080