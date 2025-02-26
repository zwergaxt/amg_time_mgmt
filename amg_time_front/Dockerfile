FROM node:18.20.7-alpine3.21
USER root

WORKDIR /usr/src/front

COPY . .

RUN npm i

ENTRYPOINT ["npm", "run", "start"]