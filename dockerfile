
FROM node:12.2.0-alpine

RUN apk add --update \
  git \
  openssh-client

WORKDIR /app

COPY . /app

RUN npm install --production

CMD ["npm", "start"]