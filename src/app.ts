import dotenv from "dotenv";
import express from "express";

import AuthRoute from "./routes/auth.route";
import UsersRoute from "./routes/users.route";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(new AuthRoute().router);
app.use(new UsersRoute().router);

app.listen(port, () => {
  return console.log("Server is listening on port " + port);
});
