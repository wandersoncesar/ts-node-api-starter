import express from "express";
import AuthMiddleware from "../middlewares/auth.middleware";
import { User } from "../models/user";

class UsersRoute {
    public path = "/users";
    public router = express.Router();
    public authMiddleware = new AuthMiddleware();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.authMiddleware.isAuthenticated, this.getAllUsers);
        this.router.get(this.path + "/:id", this.authMiddleware.isAuthenticated, this.getUserById);
        this.router.post(this.path, this.authMiddleware.isAuthenticated, this.createUser);
        this.router.put(this.path + "/:id", this.authMiddleware.isAuthenticated, this.updateUser);
        this.router.delete(this.path + "/:id", this.authMiddleware.isAuthenticated, this.deleteUser);
    }

    private getAllUsers(request: express.Request, response: express.Response) {
        User.findAll().then((users) => {
            return response.status(200).json(users);
        }).catch((error) => {
            return response.status(500).json(error);
        });
    }

    private getUserById(request: express.Request, response: express.Response) {
        User.findOne({ where: { id: request.params.id } }).then((user) => {
            return response.status(200).json(user);
        }).catch((error) => {
            return response.status(500).json(error);
        });
    }

    private createUser(request: express.Request, response: express.Response) {
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

    private updateUser(request: express.Request, response: express.Response) {
        User.update({
            email: request.body.email,
            name: request.body.name,
            password: request.body.password,
         }, { where:  { id: request.params.id }}).then((user) => {
            return response.status(200).json(user);
        }).catch((error) => {
            return response.status(500).json(error);
        });
    }

    private deleteUser(request: express.Request, response: express.Response) {
        User.destroy({ where:  { id: request.params.id }}).then((user) => {
            return response.status(200).json(user);
        }).catch((error) => {
            return response.status(500).json(error);
        });
    }
}

export default UsersRoute;
