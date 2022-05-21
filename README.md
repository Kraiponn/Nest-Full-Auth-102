<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

### <p align="center">A mini project, Authentication and Authorization with <a href="https://docs.nestjs.com/" target="_blank">Nest (NestJS), </a> is built with and fully supports TypeScript.</p>

<p align="center">

</p>

## Description

The fully authentication and authorization, And using access_token, refresh_token in project.

## Main Libraries in project

- [Prisma](https://www.prisma.io/docs/getting-started) : Next-generation Node.js and TypeScript ORM.
- [Passport (JWT)](https://www.passportjs.org/)
- [Data hashing with Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [PostgresSQL](https://www.postgresql.org/)
- [Docker](https://docs.docker.com/get-started/)

## Installation

```
$ npm install
$ yarn add
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Prisma Commands

```bash
$ npx prisma int
$ npx prisma migrate dev --name [Migration Name]
$ npx prisma generate
$ npx prisma db push
$ npx prisma db pull
$ npx prisma studio
```

## Basic Docker Compose Commands

```bash
$ docker ps -a
$ docker compose up
$ docker compose up -d
$ docker compose up -d --build
$ docker compose down
$ docker compose down --volumes
$ docker compose stop
$ docker compose start
```

## Environments

```bash
$ DATABASE_URL
$ ACCESS_TOKEN_SECRET_KEY
$ REFRESH_TOKEN_SECRET_KEY
```

## Project Infomations

```bash
  - version: 1.0.0
  - author: Kraipon Najaroon
```
