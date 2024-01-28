# Travolta Application

This repository contains the configuration files for setting up the Travolta application using Docker Compose. The application consists of a backend service (`be`), a frontend service (`fe`), and a MongoDB database (`mongo`).

## Prerequisites

- Docker
- Docker Compose

docker will create 3 containers
- Frontend
- Backend
- mongo

The mongo database is not needed but it was simple to add
and it's just running a query to get all the data

there are scripts in be/db to drop and prefill the database

the Filtering is all done in JavaScript with array manipulation
i decided you not do filtering via db queries or pipelines because 
the initial instructions stated the db was out of scope and is only a
data store now.

## Getting Started

1. Clone this repository to your local machine.

   ```bash
   git clone https://github.com/blavejr/buyingLabs.git
   cd buyingLabs
   ```

2. Set up the environment variables for the backend service by creating a `.env` file in the `be` directory. You can use the provided `.env.example` file as a template.

   ```bash
   cp be/.env.example be/.env
   ```

   Update the values in the `.env` file with your desired configurations.

3. Build and start the services using Docker Compose.

   ```bash
   docker-compose up --build
   ```

   This command will build the Docker images and start the containers for the backend, frontend, and MongoDB services.

4. Access the frontend application at [http://localhost:3000](http://localhost:3000).
