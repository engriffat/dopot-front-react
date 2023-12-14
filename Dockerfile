# Use a Node.js base image for building
FROM node:20 as builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight Nginx image for serving
FROM nginx:alpine

# Copy the built app from the previous stage
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Expose the port that Nginx will listen on (default is 80)
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
