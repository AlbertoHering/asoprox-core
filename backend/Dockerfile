
FROM node:current-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ["package.json", "package-lock.json*",  "./"]

#ARG GHT
#ENV GITHUB_TOKEN=$GHT

RUN npm install
# If you are building your code for production
#RUN GITHUB_TOKEN=$GITHUB_TOKEN npm i --only=production

# Bundle app source
COPY . .

EXPOSE 5001
CMD [ "npm", "start" ]
