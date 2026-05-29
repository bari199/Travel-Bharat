import jwt from "jsonwebtoken";

export const authMiddleware = async(req,res,next)=>{

    try {

        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){

            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.adminId = decoded.id;

        next();

    } catch (error) {

        return res.status(500).json({
            success:false,
            message:error.message
        });

    }

}