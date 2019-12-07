FROM node:10.13-alpine
RUN npm install -g typescript ts-node
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent && mv node_modules ../
COPY . .
EXPOSE 80
CMD ts-node server.ts