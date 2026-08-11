# Backend — E-HospitalBD

This document describes how to run the backend API locally and includes example requests for the patient register/login endpoints.

Prerequisites
- Node.js (18+ recommended)
- npm
- PostgreSQL (or provide a `DATABASE_URL` pointing to your DB)

Quick start

1. Install dependencies

```bash
cd backend
npm install
```

2. Set environment variables (example)

```bash
export DATABASE_URL="postgres://postgres:postgres@127.0.0.1:5432/postgres"
export JWT_SECRET="a_long_random_secret"
```

3. Run in development

```bash
npm run start:dev
```

Or build and run production

```bash
npm run build
npm run start:prod
```

Notes
- The project defaults to `DATABASE_URL` shown above if not provided.
- `JWT_SECRET` defaults to `change_me` in code; set a secure value for production.
- TypeORM is configured with `synchronize: true` for convenience — disable in production.

API examples

Register a patient

```bash
curl -X POST http://localhost:3000/patient/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phoneNo": "+8801XXXXXXXXX",
    "location": { "district": "Dhaka", "division": "Dhaka" },
    "dateOfBirth": "1990-01-01",
    "password": "secret"
  }'
```

Successful response example

```json
{
  "message": "Patient registered successfully",
  "patient": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "phoneNo": "+8801XXXXXXXXX",
    "location": { "district": "Dhaka", "division": "Dhaka" },
    "dateOfBirth": "1990-01-01",
    "createdAt": "2026-08-11T..."
  }
}
```

Login (phone + password)

```bash
curl -X POST http://localhost:3000/patient/login \
  -H "Content-Type: application/json" \
  -d '{ "phoneNo": "+8801XXXXXXXXX", "password": "secret" }'
```

Successful login example

```json
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>",
  "patient": { /* patient object */ }
}
```

Using the token for protected endpoints

```bash
TOKEN="<JWT_TOKEN>"
curl -H "Authorization: Bearer $TOKEN" http://localhost:3000/patient
```

Helpful tips
- If you add or change entities, restart the server when running with `start:dev`.
- For production, set `synchronize: false` and use migrations.

If you want, I can also add a Postman collection or protect specific routes with the JWT guard.
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## PostgreSQL setup

This project uses PostgreSQL for patient registration.

Create a `.env` file in `backend/` and set:

```bash
PORT=8000
DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5432/postgres
```

If `DATABASE_URL` is missing, set it explicitly before starting Nest.

The `postgres` database is usually available by default. Once the app starts, TypeORM will create the `patients` table automatically because `synchronize` is enabled.

If you are using a hosted PostgreSQL service, replace the URL with your provider connection string.

Make sure PostgreSQL is running before starting Nest:

```bash
psql "postgres://postgres:postgres@127.0.0.1:5432/e_hospitalbd"
```

or start your PostgreSQL service with the tool you installed it with.

## Patient API

### Register a patient

- Method: `POST`
- URL: `http://localhost:8000/patient/register`
- Headers: `Content-Type: application/json`
- Body:

```json
{
  "name": "Rahim Uddin",
  "email": "rahim@example.com",
  "phoneNo": "+8801712345678",
  "location": {
    "district": "Dhaka",
    "division": "Dhaka"
  },
  "dateOfBirth": "1995-01-01",
  "password": "secret123"
}
```

### List patients

- Method: `GET`
- URL: `http://localhost:8000/patient`

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
