# Use an official Node runtime as base image
FROM node:16.13

# Set the working directory in the container
WORKDIR /graphql-backend

# Copy package.json and package-lock.json (if available)
COPY graphql-backend/package*.json ./

# Install dependencies
RUN npm install

# Copy all local files into the image
COPY ./graphql-backend .

# Copy Prisma schema
COPY ./prisma/schema.prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run the app
CMD sh -c 'if [ "$APP_ENV" = "prod" ]; then node src/server.js; else npx nodemon src/server.js; fi'
