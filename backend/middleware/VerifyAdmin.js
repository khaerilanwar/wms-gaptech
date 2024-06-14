export const verifyAdmin = (req, res, next) => {
    if (req.email !== "teamgaptech@gmail.com") return res.sendStatus(403);
    next();
}