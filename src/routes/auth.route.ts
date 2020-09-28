import express from "express";
import jsonwebtoken from "jsonwebtoken";
import { User } from "../models/user";

class AuthRoute {
    public path = "/auth";
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(this.path + "/signin", this.signin);
        this.router.post(this.path + "/signup", this.signup);
    }

    private signin(request: express.Request, response: express.Response) {
        User.findOne({ where: { email: request.body.email } }).then((user) => {
            if (!user) {
                return response.status(400).send("Invalid email or password.");
            }

            return response.json(jsonwebtoken.sign(JSON.stringify(user), process.env.JWT_SECRET || 'shhh'));
        }).catch((error) => {
            console.log(error);
            return response.status(500).json(error);
        });
    }

    private signup(request: express.Request, response: express.Response) {
        User.create({
            email: request.body.email,
            name: request.body.name,
            password: request.body.password,
        }).then((user) => {
            return response.status(200).json(user);
        }).catch((error) => {
            return response.status(500).json(error);
        });
    }
}

export default AuthRoute;
