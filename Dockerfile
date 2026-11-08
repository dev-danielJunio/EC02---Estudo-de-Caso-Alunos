FROM nginx:stable-alpine

COPY public/ /usr/share/nginx/html/
COPY controllers/ /usr/share/nginx/html/controllers/
COPY models/ /usr/share/nginx/html/models/

EXPOSE 80
