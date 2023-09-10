FROM node:18-alpine AS build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "build"]
CMD ["npm", "run", "preview"]
