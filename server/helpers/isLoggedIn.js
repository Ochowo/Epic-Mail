import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const isLoggedIn = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  jwt.verify(token, process.env.SECRET, () => {
    if (token === null || token === '' || token === undefined) {
      return res.status(401).json({
        status: 401,
        error: 'No token provided.',
      });
    }
    return next();
  });
};
export default isLoggedIn;
