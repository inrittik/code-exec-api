FROM node:18.16.0

WORKDIR /app

RUN apt-get update && \
    apt-get -y install mono-mcs golang-go \
    openjdk-11-jdk

COPY package.json ./

COPY yarn.lock /app

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]