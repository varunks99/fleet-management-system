FROM node:lts-alpine@sha256:dd8c0730582a3d30b128d2c684aed5b1fbe0bf3c0a4dcf7f96d85f0cb0e34bba
RUN apk add dumb-init
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=node:node . /usr/src/app/
RUN npm ci --only=production
USER node
CMD ["dumb-init", "node", "server.js"]