# Travolta Application

This repository contains the configuration files for setting up the Travolta application using Docker Compose. The application consists of a backend service (`be`), a frontend service (`fe`), and a MongoDB database (`mongo`).

## Prerequisites

- Docker
- Docker Compose

docker will create 3 containers
- Frontend
- Backend
- mongo

## Databse
The mongo database is not needed but it was simple to add
and it's just running a query to get all the data, I have thought about adding queries and pipelines to do the filtering and quering in the database
but thought maybe we would like to see the array manipulation I would be doing and thus have gone with a more inefficient method which is to get all the
data from the database for each request and do the filtering manually through arrays.

Note: it would be far more efficient to offload these queries and filters to the database server as needed, at the very least distribute the workload.

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

## Performace

Since this is a simple test app I have made some perfomance adjustments but not too many

### pagination
to keep the app from having to download all the data at once even that that is not needed, I have implemented pagination, meaning the app will request for only a chunk of the data which
it needs, if it needs more data it can request for the next chunk.

### memoization
 The results of the be endpoint are cached according to the parameters, since I have opted to do all the filtering in arrays and not ofboard it to the database
the database call will be very long for each call, since it will literally return all items from the database each time, this again was purposefully done as to not offload too
much of the work to the database but instead do the array manipulation my self.

To speed things up, I cache results after computation for each result in a map, a service like redis would be better suited but again I think it is better to show the concept.
Each request will cache its results and also cache the results for the next page, this significantly speeds up response time from seconds in the first request to milliseconds in
the seconds request as the data is already stored in memory and is simply retrieved and returned

### infinite scrolling
To better the user experience I have implemented infinite scrolling in the react frontend, this means, the user will keep scrolling and the app will automatically make a request to
get the next page data when the last element in the current page data is in the view port.
