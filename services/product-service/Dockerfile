FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY src/ ./src
COPY seed-data.json ./seed-data.json

EXPOSE 8002
CMD ["node", "src/server.js"]
