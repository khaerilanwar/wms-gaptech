export const authToken = (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Access denied, token missing" });
    }

    req.token = token;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};  