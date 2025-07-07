import  jwt  from "jsonwebtoken";


export const authMiddle = (req , res ,next , error) => {
    const token = req.headers.authorization?.split( ' ' )[ 1 ];
    if (!token) return res.status(401).json({ message: error });
    try{
        const decode = jwt.verify(token , process.env.JWT_SECRET);
        req.userId = decode.userId;
        req.email = decode.email
        next()
    }catch(error){
        res.status(401).json({ message: 'Token invalid' });
    }
};
