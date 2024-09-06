// src/middleware/checkRole.js
const jwt = require('jsonwebtoken');

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      return next(); 
    }

    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ message: "Не авторизован. Отсутствует заголовок авторизации." });
      }

      const token = authHeader.split(' ')[1]; // Bearer <token>

      if (!token) {
        return res.status(401).json({ message: "Не авторизован. Токен не предоставлен." });
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if (decoded.role !== role) {
        return res.status(403).json({ message: "Нет доступа. Нужны права администратора." });
      }

      req.user = decoded;
      next(); 
    } catch (e) {
      return res.status(401).json({ message: "Не авторизован. Ошибка верификации токена." });
    }
  };
};


