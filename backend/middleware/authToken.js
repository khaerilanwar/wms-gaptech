export const authToken = (req, res, next) => {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
  
    if (!token) return res.status(401).json({ msg: "Access denied, token missing" });
  
    req.token = token;
    next();
  };
  