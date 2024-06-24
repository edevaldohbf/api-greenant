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

## Documentation
All endpoints have been documented with Postman can be accessed via this [link](https://documenter.getpostman.com/view/14821693/2sA3XWdJjW).

### Endpoints and How each one Works

- **Health Check**
  - Method: GET
  - Url: /api/health-check
  - Query Params: None
  - Comments: This endpoint is used to verify if the server is running.
- **Get Measurement**
  - Method: GET
  - Url: /api/device/mymeter-uid,mymeter-02-uid/measurements?startDate=2022-06-01 00:00:00+00&endDate=2022-06-01 05:00:00+00&resolution=raw
  - Query Params:
    - startDate: date in ISO format
    - endDate: date in ISO format
    - resolution: raw | hour | day (default)
  - Comments: This is the primary endpoint. It returns a JSON object containing deviceId, date, and activeEnergy for raw data, or accumulatedEnergy for hourly and daily data.
- **Get Measurement Complete Data**
  - Method: GET
  - Url: /api/device/mymeter-uid,mymeter-02-uid/measurements/complete-data?startDate=2022-06-01 00:00:00+00&endDate=2022-06-01 05:00:00+00&resolution=raw
  - Query Params:
    - startDate: date in iso format
    - endDate: date in iso format
    - resolution: raw | hour | day (Default)
  - Comments: This endpoint is supplementary. It utilizes pre-calculated data and works in conjunction with the next endpoint. When data is added to the measurementsRaw table, entries are automatically created or updated in the measurementsHour and measurementsDay tables. This allows for efficient data retrieval with minimal load time. However, it is limited to querying data with specific start times. This endpoint returns the data from the Get Measurement endpoint, adding activeEnergy sum, activeEnergy average, activePower sum, activePower average, and aggregateCount.
- **Create Measurement**
  - Method: POST
  - Url: /api/device/mymeter-uid/measurements
  - Body:
    - timestamp: date in iso format
    - activeEnergy: integer number
    - activePower: integer number
  - Comments: This supplementary endpoint creates data and calculates entries in all three tables. With each data input, new entries are created or updated. When an entry is updated, the calculated columns are recalculated.

## Folder Structure
- **dist** - Compiled code
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

## Install and Run with Docker

Ensure that you have Docker installed on your PC. Here is a [tutorial for installation on Ubuntu](https://docs.docker.com/engine/install/ubuntu/). Execute the following commands will generate one containers for api and another one for database.

Ensure that you have the correct version of Node.js. This project uses version [20.14.0](https://nodejs.org/pt/blog/release/v20.14.0).
```bash
# Initialize the configuration by creating an env file
cp .env-example .env

# Install all dependencies
$ yarn install

# Build Docker images without using the cache
$ docker compose build --no-cache

# Run Docker Compose to start containers. The -d flag runs Docker Compose as a background task.
$ docker compose up -d
```

The API is now running on http://localhost:3000. To test if it is working, access the route http://localhost:3000/api/health-check.

```bash
# This command will populate the database using a JSON file located at /prisma/seed
$ yarn populate
```

** To stop the Docker-related services, run the following command:
```bash
$ docker compose down
```

## Test

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
