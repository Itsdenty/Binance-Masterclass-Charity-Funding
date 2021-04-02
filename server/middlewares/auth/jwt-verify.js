import jwt from 'jsonwebtoken';
import Transformer from '../../utils/transformer';

const JWT = {};

JWT.verifyToken = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.Authorization || req.headers.authorization;
  token = token ? token.substring(7) : token;
  if (!token) {
    return res.status(403).json(Transformer.transformResponse(0, 'No token provided'));
  }
  const verifyCallBack = (error, decoded) => {
    if (error) {
      return res.status(401).json(Transformer.transformResponse(0, error.message));
    }

    req.decodedToken = decoded.data;
    next();
  };
  jwt.verify(token, process.env.SECRET, verifyCallBack);
};

module.exports = JWT;