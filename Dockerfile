FROM node:alpine
WORKDIR '/app'
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx
EXPOSE 80
COPY --from=0 /app/build /usr/share/nginx/html
# docker build .
# docker run -p 8080:80 CONTAINER_ID
#               out   inside 