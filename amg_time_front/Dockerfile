FROM node:18.20.7-alpine3.21
USER root

WORKDIR /usr/src/front

COPY ./package.json .

RUN npm i

COPY . .

ENTRYPOINT ["npm", "run", "start"]