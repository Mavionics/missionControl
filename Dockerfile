FROM node:8
# Create app directory
WORKDIR /app

COPY /mavionics/package*.json /app/

RUN npm install