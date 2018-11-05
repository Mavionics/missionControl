FROM node:8
# Create app directory
WORKDIR /app

COPY /mavionics/package*.json /app/

RUN apt update
RUN npm install
RUN npm install -g firebase-tools

COPY /mavionics/ /app/