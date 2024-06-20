FROM node:20.14.0

WORKDIR /app

COPY package*.json ./

RUN yarn cache clean \
  rm node_modules/ \
  yarn install --frozen-lockfile

COPY . .

RUN yarn build

CMD [ "yarn", "start:dev" ]