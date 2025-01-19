# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port your Next.js app runs on
EXPOSE 3000

# Command to start the Next.js development server
CMD ["npm", "run", "dev"]
