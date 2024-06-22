<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A [Nest](https://github.com/nestjs/nest) framework TypeScript repository integrated with [Prisma ORM](https://www.prisma.io/).


## Folder Structure
 **dist** - Compiled code
- **prisma** - ORM configuration
  - **migrations** - Database updates
  - **seed** - Database seed script and JSON asset for the script
  - **schema.prisma** - Tables and columns configuration
- **src** - Contains all functional code
- **database** - Contains the link between the functional code and Prisma ORM
- **health-check** - Contains an endpoint to verify if the application is online
- **utils** - Contains structures that can be used in multiple modules
- **device-measurements**
  - **dto** - Contains Data Transfer Objects for validation of request bodies and query parameters
  - **services** - Contains the business logic of the application and is responsible for database queries
  - **controller file** - Sets the endpoints and handles query parameters. Following this pattern, the service will always receive quality data.
  - **module file** - Unifies all module imports that device-measurements need
  - **main file** - Starts the server and initializes all modules

## Installation
You can install and run the application using Docker or directly through your terminal. If you choose the latter, a Postgres database must be provided.

### Install and Run with Docker
Ensure that you have Docker installed on your PC. Here is a [tutorial for installation on Ubuntu](https://docs.docker.com/engine/install/ubuntu/).

```bash
# Build Docker images without using the cache
$ docker compose build --no-cache

# Run Docker Compose and start containers. The -d flag runs Docker Compose as a background task.
$ docker compose up -d
```
After running these commands, you can start populating your database with:
```bash
# This command will update the database using a JSON file located at /prisma/seed
$ yarn populate
```
The API is now populated and running on http://localhost:3000. To test if it is working, access the route http://localhost:3000/api/health-check.

** To stop the Docker-related services, run the following command:
```bash
$ docker compose down
```

### Install and Run with Command Line
Ensure that you have the correct version of Node.js. This project uses version [20.14.0](https://nodejs.org/pt/blog/release/v20.14.0).
```bash
# Initialize the configuration by creating an env file
cp .env-example .env

# Install all dependencies
$ yarn install
```
After running these commands, you can start populating your database with:
```bash
# This command will update the Prisma schemas
$ prisma generate

# This command will update the database using a JSON file located at /prisma/seed
$ yarn populate
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
