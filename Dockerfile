FROM node:21.4.0-alpine3.17

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app