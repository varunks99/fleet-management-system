# Stage 1
FROM node as build
WORKDIR /usr/local/app
COPY . /usr/local/app/
RUN npm ci --only=production
RUN npm run build

# Stage 2
FROM nginx:alpine@sha256:2e76f4d4e21bae1d012267cff67e032bb006a2cff5c00afa5d4ad011c1855128
COPY --from=build /usr/local/app/dist/fleet-client /usr/share/nginx/html
EXPOSE 80