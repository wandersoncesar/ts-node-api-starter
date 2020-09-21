import express from "express";
import jsonwebtoken from "jsonwebtoken";

class AuthRoute {
    public path = "/auth";
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(this.path + "/login", this.login);
    }

    private login(request: express.Request, response: express.Response) {
        return response.json(jsonwebtoken.sign({}, process.env.JWT_SECRET));
    }
}

export default AuthRoute;
