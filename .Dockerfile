# Use the specific Node version
FROM node:20.10.0

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your app's source code from your project root to the working directory in the Docker container
COPY . .

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run your app
CMD [ "npm", "run", "start" ]