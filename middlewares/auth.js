import { validateToken } from "../services/authentication.js"

function checkForAuth(cookieName) {
    return (req, res, next) => {
        const tokenValue = req.cookies[cookieName];

        if (!tokenValue) {
            return next();
        }

        try {
            const userPayload = validateToken(tokenValue);
            req.user = userPayload;
            return next();
        } catch (error) {
        }

        return next();
    };
}

export default checkForAuth;
