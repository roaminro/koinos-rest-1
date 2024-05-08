# https://towardsserverless.com/articles/dockerize-nextjs-app

FROM node:18-alpine AS build
# Install dependencies only when needed
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat python3
WORKDIR /app
# Copy and install the dependencies for the project
COPY package.json yarn.lock ./
RUN yarn install
# Copy all other project files to working directory
COPY . .
# Run the next build process and generate the artifacts
RUN yarn build

# we are using multi stage build process to keep the image size as small as possible
FROM node:18-alpine
# update and install latest dependencies, add dumb-init package
# add a non root user
RUN apk update && apk upgrade && apk add dumb-init python3

# set work dir as app
WORKDIR /app
# copy the public folder from the project as this is not included in the build process
COPY --from=build /app/public ./public
# copy the standalone folder inside the .next folder generated from the build process
COPY --from=build /app/.next/standalone ./
# copy the static folder inside the .next folder generated from the build process
COPY --from=build /app/.next/static ./.next/static

# expose 3000 on container
EXPOSE 3000

# set app host ,port and node env
ENV HOST=0.0.0.0 PORT=3000 NODE_ENV=production
# start the app with dumb init to spawn the Node.js runtime process
# with signal support
CMD ["dumb-init","node","server.js"]