# Use Node.js image as the base
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
