# Travolta Application

This repository contains the configuration files for setting up the Travolta application using Docker Compose. The application consists of a backend service (`be`), a frontend service (`fe`), and a MongoDB database (`mongo`).

## Prerequisites

- Docker
- Docker Compose

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
