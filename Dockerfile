# Use the Node.js base image
FROM node:20-alpine

# Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port and define the command to start the application
EXPOSE 3000
CMD ["npm", "start"]