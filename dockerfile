FROM node:current-alpine3.21

COPY . /usr/app

WORKDIR /usr/app 

RUN npm install 

RUN npm run build 

CMD ["npm","start"]

