# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --no-frozen-lockfile

# Copy source code
COPY . .

# Build the application (static export to /out)
RUN pnpm run build

# Stage 2: Serve the application
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/port8080.conf

# Copy built assets from builder stage
COPY --from=builder /app/out /usr/share/nginx/html

# Use a non-root user matching the one in nginx:alpine (optional, but good practice if possible, though strict requirement varies)
# For simplicity and broad compatibility on Cloud Run (which handles user mapping well), standard nginx user is fine.
# We ensure permissions are correct if we were doing more complex things, but copying usually works.

# Expose port 8080 (Matches the listener in nginx.conf)
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
