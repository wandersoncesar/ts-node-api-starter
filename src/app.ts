import dotenv from "dotenv";
import express from "express";

import AuthRoute from "./routes/auth.route";
import UsersRoute from "./routes/users.route";

import * as bodyParser from "body-parser";

import * as swaggerUi from "swagger-ui-express";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ type: "application/json" }));

app.use('/', swaggerUi.serve, swaggerUi.setup({}));

app.use(new AuthRoute().router);
app.use(new UsersRoute().router);

app.listen(port, () => {
  return console.log("Server is listening on port " + port);
});
