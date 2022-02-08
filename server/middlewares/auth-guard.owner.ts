import { NextFunction, Response, Request } from "express";
import dotenv from 'dotenv';
import { User, UserRole } from "../entities/user.enitity";

dotenv.config();

export const OwnerGuard = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { payload } = req;
        const user = await User.query(`
            select "type" from users
            where "users"."id" = $1
        `, [payload?.userId]);
        if (user.length != 0 && (user.type == UserRole.OWNER || user.type == UserRole.ADMIN))
            return next();
        return res.status(404).json({
            statusCode: 404,
            error: 'forbidden',
            method: req.method,
            timestamp: new Date(),
        });
    }catch(err) {
        return err;
    }
}