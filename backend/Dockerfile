FROM ubuntu:18.04

RUN apt-get update -qq && apt-get install -y -qq curl gnupg && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y -qq nodejs yarn nginx

COPY users-app /users-app


WORKDIR /users-app

RUN cd /users-app && yarn install
RUN yarn global add nodaemon

CMD ["yarn", "start"]