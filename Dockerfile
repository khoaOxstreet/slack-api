FROM node:10.19.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
EXPOSE 3000

RUN npm run build

CMD npm run start