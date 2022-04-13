FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Copy all files into the container
COPY . .

# Install dependencies
RUN npm install

# Install client dependencies and build
#RUN npm run build

# Open appropriate port 
EXPOSE 8080

# Start the application
CMD [ "node", "server.js" ]
