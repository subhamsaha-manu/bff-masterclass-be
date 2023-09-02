FROM node:14.17.0

LABEL builder=true
WORKDIR /src

#install all packages required.
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY .npmrc ./.npmrc

RUN npm ci

COPY . .

#build and test
RUN npm run generate:all
RUN npm run build

#option is commented as we install apollo later and the dependencies are removed which are required later.
#RUN npm prune --production

# Base Image setup
#FROM docker-registry.alefed.com/node:14.17.1-alpine

# install packages
RUN npm install -g pm2 apollo

# create app directory
WORKDIR dist/

# copy rest of the source
#COPY --from=build /src/dist/ .
#COPY --from=build /src/node_modules node_modules

# expose the port
EXPOSE 9000

#RUN sh -c "apk add curl openssl"

CMD sh -c "pm2-runtime start index.js -i ${APP_INSTANCE_NUMBER:-2} --node-args='-r tsconfig-paths/register'"
