FROM node:18-alpine
LABEL authors="Max"
WORKDIR /app

COPY package*.json ./
COPY package-lock.json ./

RUN npm install

COPY src ./src
COPY tsconfig.json ./
COPY next.config.mjs ./

RUN npm i sharp run build

EXPOSE 3000

ENTRYPOINT ["npm", "start"]