import { verifyJWTStudent } from "./authstudent.middleware.js";
import { verifyJWT } from "./authteacher.middleware.js";

const verifyJWTCombined = (req, res, next) => {
    verifyJWT(req, res, (teacherErr) => {
        verifyJWTStudent(req, res, (studentErr) => {
            if (teacherErr && studentErr) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            if (!teacherErr) {
                req.teacher = req.teacher; // Set req.teacher if teacher verification is successful
            }
            if (!studentErr) {
                req.student = req.student; // Set req.student if student verification is successful
            }
            next();
        });
    });
};

export { verifyJWTCombined };