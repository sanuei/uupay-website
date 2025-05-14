FROM nginx:1.14.2

COPY dist/ /usr/share/nginx/html

EXPOSE 80 443
