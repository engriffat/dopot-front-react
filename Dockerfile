# Use an official Node.js runtime as a parent image
FROM node:20-alpine as base

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force && npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application for production
RUN npm run build

# Use a smaller image for production
FROM node:20-alpine

# Install serve globally
RUN npm install -g serve

# Set the working directory to /app
WORKDIR /app

# Copy the application build from the previous stage
COPY --from=base /app/build .

# Expose port 3000
EXPOSE 3000

# Set the command to run the application using serve
CMD ["sh", "-c", "export SERVE_OPTIONS='--maxChunkSize 65536 --maxResponseSize 1048576' && serve -p 3000 -s ."]
