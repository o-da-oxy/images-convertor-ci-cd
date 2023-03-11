###################
# Dependencies
###################

FROM node:18.14-alpine As deps
RUN mkdir /app && chown node:node /app
USER node
# создание директории приложения
WORKDIR /app

# COPY - скопировать файл в докер контейнер
# установка зависимостей
# * - скопировать оба файла: package.json и package-lock.json
COPY --chown=node:node package*.json ./
RUN npm ci

###################
# Code
###################
FROM node:18.14-alpine as builder
RUN mkdir /app && chown node:node /app
USER node
WORKDIR /app

# TODO separate
COPY --chown=node:node --from=deps /app/node_modules ./node_modules
# copy sourse files
COPY --chown=node:node . .

RUN npm run compile

###################
# PRODUCTION
###################
FROM node:18.14-alpine As production
RUN mkdir /app && chown node:node /app
USER node
WORKDIR /app

COPY --chown=node:node --from=builder /app/build ./build
COPY --chown=node:node --from=builder /app/.env ./
COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD [ "node", "./build/src/index.js" ]
