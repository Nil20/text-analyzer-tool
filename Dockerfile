# Use an official Node.js runtime as a parent image
FROM node:18

# Update and upgrade the package lists
RUN apt-get update && apt-get upgrade -y

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to start the app
CMD ["npm", "start"]
