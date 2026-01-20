# Use Node.js 20 Alpine (Required for Next.js 16)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files first to leverage cache
COPY package.json pnpm-lock.yaml ./

# Install dependencies (production only to save space, but we need devDeps for build usually, so install all then prune)
# Actually for next build we need dev dependencies.
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN pnpm run build

# Cloud Run sets the PORT environment variable.
# Next.js automatically listens on PORT if it's set.
ENV PORT=8080
EXPOSE 8080

# Start the application
CMD ["pnpm", "start"]
