import express from "express";
import jsonwebtoken from "jsonwebtoken";

class AuthMiddleware {
    public router = express.Router();

    public isAuthenticated(request: express.Request, response: express.Response, next: express.NextFunction) {
        const authorization = request.headers.authorization;
        const splitted = authorization ? authorization.split(" ") : null; // ["Bearer", "eyJpc3MiOiJ0b..."]

        if (!splitted || splitted.length !== 2) {
            return response.status(401).send("Authorization is missing.");
        }

        jsonwebtoken.verify(splitted[1], process.env.JWT_SECRET || "shhh", (error) => {
            if (error) {
                return response.status(401).json(error);
            }

            return next();
        });
    }
}

export default AuthMiddleware;
