import JwtService from "../services/jwt.service.js";

export const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Token yo‘q" });

    const token = authHeader.split(" ")[1];
    try {
      const payload = new JwtService().verifyToken(token);
      req.user = payload; 

      if (roles.length && !roles.includes(payload.role)) {
        return res.status(403).json({ message: "Ruxsat yo‘q" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  };
};
