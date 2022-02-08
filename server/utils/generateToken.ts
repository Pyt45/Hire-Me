import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export interface IUser {
    email: string;
    password: string;
}

export const generateToken = async (payload: jwt.JwtPayload) => {
    try {
        let token;
        if (process.env.JWT_TOKEN)
            token = await jwt.sign(payload, process.env.JWT_TOKEN);
        return token;
    }catch(err) {
        return err;
    }
}