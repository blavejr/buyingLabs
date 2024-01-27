import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index";
import cors from "cors";
import config from "./utils/config";

const app = express();

const corsOptions = {
  origin: [config.feUrl], 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
// I would also have a JWT token authentication middleware here
// app.use(authenticationMiddleware);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

// App seperated from server for testing purposes
export default app;
