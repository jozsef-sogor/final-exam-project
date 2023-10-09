# Use an official Node runtime as base image
FROM node:16.13

# Set the working directory in the container
WORKDIR /rest-backend

# Copy package.json and package-lock.json (if available)
COPY rest-backend/package*.json ./

# Install dependencies
RUN npm install

# install prisma
RUN npm install prisma@5.4.1

# Copy all local files into the image
COPY ./rest-backend .

# Copy ORM files
COPY ../prisma .

# Generate Prisma client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 4500

# Wait for DB answer
CMD ["node", "/rest-backend/wait-for-db.js"]

# Define the command to run the app
CMD sh -c 'if [ "$APP_ENV" = "prod" ]; then node src/server.js; else npx nodemon src/server.js; fi'
