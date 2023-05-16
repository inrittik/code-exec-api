FROM node:18.16.0 as base

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN yarn build