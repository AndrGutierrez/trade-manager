FROM node:16-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
ENV REACT_APP_API_PATH /api
RUN npm ci 
RUN npm i -g serve
RUN npm run build
# Build the app

CMD ["serve", "-s", "build"]
