FROM node:14-slim

RUN mkdir -p /app/src
WORKDIR /app/src

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install --network-timeout 100000

COPY . .

EXPOSE 3000

CMD [ "yarn", "dev:container"]