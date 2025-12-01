# Use an official Node.js image as the base and name this stage "builder"
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy only package files to leverage Docker’s cache
COPY package*.json ./

# Install dependencies using npm ci for a clean, reproducible install
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the application for production
RUN npm run build

# Declare the output folder as a volume so you can mount it locally
VOLUME ["/app"]

# Keep the container running (or simply exit if you plan to use docker cp)
CMD ["npm", "run", "start"]

