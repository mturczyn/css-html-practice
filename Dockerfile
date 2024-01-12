FROM nginx:alpine

ENV CI=false
ENV PORT=3001

COPY ./static /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]