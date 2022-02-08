import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const JwtGuard = async (req: any, res: Response, next: NextFunction) => {
    try {
        // const token = await req.cookies.token;
        const token = await req.headers["authorization"].split(' ')[1];

        if (!token)
            return res.status(404).json({
                msg: 'forbidden'
            });

        let payload: jwt.JwtPayload | string = await jwt.verify(token, process.env.JWT_TOKEN || '');
        req.payload = payload;

        if (payload)
            return next();
        return "forbidden";
    } catch(err) {
        return err;
    }
}