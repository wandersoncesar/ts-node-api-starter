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
        User.findOne({ where: { email: request.body.email, password: request.params.password } }).then((user) => {
            if (!user) {
                return response.status(400).send("Invalid email or password.");
            }

            return response.status(200).json(jsonwebtoken.sign(JSON.stringify(user), process.env.JWT_SECRET || "shhh"));
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
        }).then(() => {
            return response.status(201).json();
        }).catch((error) => {
            return response.status(500).json(error);
        });
    }
}

export default AuthRoute;
