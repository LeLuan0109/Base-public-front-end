FROM nginx:1.26.3-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/sls-public-frontend /usr/share/nginx/html