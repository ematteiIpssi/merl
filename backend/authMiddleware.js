import jwt from 'jsonwebtoken';


const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Contient l'ID de l'utilisateur
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token invalid' });
    }
};

export default protect;
