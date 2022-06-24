# Create image based on the official Node 10 image from dockerhub
FROM node:16.14.2

WORKDIR /app

COPY ["package.json", "package-lock.json*",  "./"]

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]