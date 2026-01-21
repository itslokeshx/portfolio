FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm && \
    pnpm install --no-frozen-lockfile

# Copy all source files
COPY . .

# Build the app
RUN pnpm run build

# Set environment
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Start the server
CMD ["pnpm", "start"]
