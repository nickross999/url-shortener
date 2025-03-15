FROM node:slim AS frontend
WORKDIR /app/client/
COPY /client/ .
RUN npm install
RUN npm run build

FROM node:slim AS backend
ENV NODE_ENV=production
COPY --from=frontend /app/client/dist/ /app/client/dist/
WORKDIR /app/server/
COPY /server/ .
RUN npm install

FROM gcr.io/distroless/nodejs22-debian12
COPY --from=backend /app/ /app/
EXPOSE 8080
CMD ["/app/server/index.js"]