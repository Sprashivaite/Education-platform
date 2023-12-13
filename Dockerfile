FROM node:16.3.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

WORKDIR /app/client
COPY client/package*.json ./
RUN npm install

WORKDIR /app

COPY . .

EXPOSE 3000

CMD ["npm", "run", "server"]
