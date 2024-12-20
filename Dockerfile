FROM node:20-alpine3.17

WORKDIR /app

COPY . . 

RUN npm install --force
RUN npx prisma generate
EXPOSE 3000

CMD [ "npm", "run","dev"]