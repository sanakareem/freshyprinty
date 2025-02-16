# assessment/Dockerfile
# Stage 1: Build Frontend
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY github-search-frontend/package*.json ./
RUN npm install
COPY github-search-frontend/ .
RUN npm run build

# Stage 2: Build Backend
FROM node:18 AS backend-build
WORKDIR /app/backend
COPY apparel-inventory-api/package*.json ./
RUN npm install
COPY apparel-inventory-api/ .
RUN npm run build

# Stage 3: Production
FROM node:18-slim
WORKDIR /app
COPY --from=backend-build /app/backend/dist ./dist
COPY --from=backend-build /app/backend/node_modules ./node_modules
COPY --from=backend-build /app/backend/package*.json ./
COPY --from=frontend-build /app/frontend/dist/github-search-frontend/browser ./public

EXPOSE 3000
CMD ["npm", "start"]