FROM ubuntu:18.04

RUN apt-get update -qq && apt-get install -y -qq curl gnupg && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y -qq nodejs yarn nginx

COPY users-app /frontend
COPY nginx/users-app.conf /etc/nginx/conf.d/users-app.conf


WORKDIR /frontend

RUN cd /frontend && yarn install

RUN cd /frontend && yarn build && \
    cp -a /frontend/build /var/www/users-app && \
    rm /etc/nginx/sites-available/* && \
    rm /etc/nginx/sites-enabled/*

CMD ["nginx", "-g", "daemon off;"]