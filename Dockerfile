FROM node:alpine

WORKDIR /app

COPY package.json .

ARG NODE_DEV

RUN if ["${NODE_DEV}" = "production"]; \
    then npm install --only=production; \
    else npm install; \
    fi

RUN npm install

RUN apk add bash

COPY .  .

EXPOSE 3000

RUN npm install --save-dev nodemon


CMD ["npm", "run", "dev"]

