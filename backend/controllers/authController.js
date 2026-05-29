import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async(req,res)=>{

    try {

        const {email,password} = req.body;

        if(
            email !== process.env.ADMIN_EMAIL
        ){
            return res.status(400).json({
                success:false,
                message:"Invalid Email"
            });
        }

        const checkPassword =
            password === process.env.ADMIN_PASSWORD;

        if(!checkPassword){

            return res.status(400).json({
                success:false,
                message:"Invalid Password"
            });
        }

        const token = jwt.sign(
            {email},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );

        return res.status(200).json({
            success:true,
            token
        });

    } catch (error) {

        return res.status(500).json({
            success:false,
            message:error.message
        });

    }

}