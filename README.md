# Reactjs (Nextjs with NextAuth) JWT login example with refreshtoken

* [Introduction](#introduction)
* [Requirements](#requirements)
* [Running the application locally](#running-the-application-locally)
* [Docker](#docker)
* [Copyright](#copyright)
* [Author](#author)

## Introduction

This project is a simple example of how you would implement a login flow
using [JSON WebTokens](https://jwt.io/), [React](https://react.dev/), [Nextjs](https://nextjs.org/), [NextAuth](https://next-auth.js.org/).

The example was developed and tested
using [this backend](https://github.com/stdNullPtr/SpringBoot-Authentication-Service-JWT)
setup (make sure you invoke the signup endpoint first)

There are a lot of TODOs to turn this PoC into an MVP. Including Functionality polishing, a clean UI for testing, etc.

## Requirements

- [Node](https://nodejs.org/en)
- (Optional(TODO)) [Docker](https://docs.docker.com/engine/install/)

## Running the application locally

Clone [this backend](https://github.com/stdNullPtr/SpringBoot-Authentication-Service-JWT)

Follow the instructions to set it up, preferably with Docker.

Afterward, run ```npm run dev``` to start the server locally.
It should be configured to connect to the backend we set up previously

Navigate to ```http://localhost:3000``` to get to the landing, unprotected page.

Having followed the instructions to register in the backend service, use the account to explore the authentication
functionality.

A typical flow:

1. Sign up with Postman against the backend
2. Use the UI (from this project) to login
3. Receive an access token that can be used to access further resources, alongside with a refresh token that can be used
   to silently refresh the access token.

Things to note in this project:
- ```async jwt({ token, user })``` [callback](src\app\api\auth\[...nextauth]\route.ts)
- ```async session({ session, token })``` [callback](src\app\api\auth\[...nextauth]\route.ts)
- [Protected path](src\app\profile\page.tsx)

## Docker

There is a [Dockerfile](Dockerfile) present, but a docker-compose is needed with a network setup(to be in the same
network as the backend) to function properly. Right now, it cannot connect to the backend if started as a docker
container.

## Copyright

License: [BSD-4-Clause](LICENSE)

## Author

[Antonio - LinkedIn](https://www.linkedin.com/in/antonio-lyubchev/)