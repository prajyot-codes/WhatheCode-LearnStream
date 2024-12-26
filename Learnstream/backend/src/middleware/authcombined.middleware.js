import { verifyJWTStudent } from "./authstudent.middleware.js";
import { verifyJWT } from "./authteacher.middleware.js";

const verifyJWTCombined = (req, res, next) => {
    verifyJWT(req, res, (err) => {
        if (err) {
            verifyJWTStudent(req, res, next);
        } else {
            next();
        }
    });
};

export { verifyJWTCombined }