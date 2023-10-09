FROM nginx:alpine

ARG ENVIRONMENT

COPY nginx/nginx.${ENVIRONMENT}.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]