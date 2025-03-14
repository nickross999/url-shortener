FROM node:23-alpine

WORKDIR /app/client
COPY /client/ .
RUN npm install

CMD ["npm", "run", "build"]

FROM node:23-alpine
COPY --from=0 /app/client/dist/ /app/client/dist/
WORKDIR /app/server/
COPY /server/ .
RUN npm install
EXPOSE 8080
CMD ["node", "index.js"]