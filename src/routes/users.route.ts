import express from "express";
import AuthMiddleware from "../middlewares/auth.middleware";

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
        return response.send("Get all users.");
    }

    private getUserById(request: express.Request, response: express.Response) {
        return response.send("Get user by id.");
    }

    private createUser(request: express.Request, response: express.Response) {
        return response.send("Create user.");
    }

    private updateUser(request: express.Request, response: express.Response) {
        return response.send("Update user.");
    }

    private deleteUser(request: express.Request, response: express.Response) {
        return response.send("Delete user.");
    }
}

export default UsersRoute;
