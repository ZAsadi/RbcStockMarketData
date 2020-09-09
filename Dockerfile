FROM node:12-alpine
LABEL author="Zahra Asadi"
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9090
CMD [ "npm", "start"]