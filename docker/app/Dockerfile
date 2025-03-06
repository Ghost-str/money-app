FROM node:22-alpine AS build

WORKDIR /app
COPY ./ /app

RUN npm ci && npm run build


FROM node:22-alpine 

WORKDIR /app
COPY --from=build /app/dist /app
COPY --from=build /app/package-lock.json /app/package-lock.json
COPY --from=build /app/package.json /app/package.json

RUN npm ci --omit=dev --ignore-scripts

CMD [ "node", "src/index.js" ]