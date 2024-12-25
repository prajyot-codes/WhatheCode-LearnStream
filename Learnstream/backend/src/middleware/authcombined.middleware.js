import { verifyJWTStudent } from "./authstudent.middleware";
import { verifyJWT } from "./authteacher.middleware";

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