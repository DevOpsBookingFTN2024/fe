# FROM node:18-alpine

# WORKDIR /app

# COPY package.json .

# RUN npm install --legacy-peer-deps

# RUN npm i -g serve

# COPY . .

# # ARG VITE_USER_API_URL
# # ARG VITE_ACCOMMODATIONS_API_URL
# # ARG VITE_APP_NAME
# # ARG VITE_STANDARD_FIELD_MAX_LENGTH
# # ARG VITE_LONGER_FILED_MAX_LENGHT
# # ARG VITE_MAX_FILE_SIZE

# # ENV VITE_USER_API_URL=${VITE_USER_API_URL}
# # ENV VITE_ACCOMMODATIONS_API_URL=${VITE_ACCOMMODATIONS_API_URL}
# # ENV VITE_APP_NAME=${VITE_APP_NAME}
# # ENV VITE_STANDARD_FIELD_MAX_LENGTH=${VITE_STANDARD_FIELD_MAX_LENGTH}
# # ENV VITE_LONGER_FILED_MAX_LENGHT=${VITE_LONGER_FILED_MAX_LENGHT}
# # ENV VITE_MAX_FILE_SIZE=${VITE_MAX_FILE_SIZE}

# RUN npm run build

# EXPOSE 3000

# CMD [ "serve", "-s", "dist" ]

# Step 1: Build the React app
FROM node:18-alpine as build

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Step 2: Use NGINX to serve the app
FROM nginx:alpine

# Copy the build output from the previous stage to NGINX's public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the NGINX config to configure proxying for API calls
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (NGINX default port)
EXPOSE 80
