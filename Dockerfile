# syntax=docker/dockerfile:1
FROM node:16-alpine
ARG VUE_APP_MQTT_URL
ENV VUE_APP_MQTT_URL $VUE_APP_MQTT_URL
WORKDIR /opt/app

COPY ["package.json", "yarn.lock", "./"]
COPY ["src/connector", "./src/connector/"]
COPY ["gui/package.json", "gui/yarn.lock", "./gui/"]
COPY ["logo/package.json", "logo/yarn.lock", "./logo/"]
RUN NODE_ENV=development yarn --ignore-scripts --frozen-lockfile
RUN NODE_ENV=development yarn --ignore-scripts --frozen-lockfile --cwd gui
RUN NODE_ENV=development yarn --ignore-scripts --frozen-lockfile --cwd logo

COPY ["src", "./src/"]
COPY ["logo", "./logo/"]
COPY ["gui", "./gui/"]
COPY ["gulpfile.js", "tsconfig.json", "./"]
RUN echo -e "\nVUE_APP_MQTT_URL=$VUE_APP_MQTT_URL" >> gui/.env
RUN yarn build

CMD ["node", "dist/helios.js"];