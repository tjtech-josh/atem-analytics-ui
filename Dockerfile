# Step 1: Build the Angular application
FROM node:lts-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npm install -g @angular/cli

COPY . .

RUN npm run build --configuration=production --aot --output-hashing=all

# Step 2: Serve the application with nginx
FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/* /usr/share/nginx/html

COPY ./entrypoint.sh /entrypoint.sh

EXPOSE 80

CMD ["sh", "/entrypoint.sh"]
