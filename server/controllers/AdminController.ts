import { Response, Request } from "express";
import { Channel } from "../entities/channel.entity";
import { User, UserRole } from "../entities/user.enitity";

export class AdminController {
    getUsers = async (req: Request, res: Response) => {
        try {
            const users = await User.query(`
                select * from users;
            `);
            return res.status(200).send(users);
        }catch(err) {
            //
        }
    }

    getUser = async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;
            const user = await User.query(`
                select * from users
                where "users"."id" = $1
            `, [userId]);
            if (!user)
                return res.status(404).json({
                    msg: 'User not found'
                });
            return res.status(200).send(user);
        }catch(err) {
            //
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;
            const user = await User.query(`
                delete from users
                where "users"."id" = $1
                and "users"."type" != $2
                returning *;
            `, [userId, UserRole.OWNER]);
            return res.status(200).send(user[0][0]);
        }catch(err) {
            //
        }
    }

    getChannels = async (req: Request, res: Response) => {
        try {
            const channels = await Channel.query(`
                select * from channels
            `);
            return res.status(200).send(channels);
        }catch(err) {
            //
        }
    }
    getChannel = async (req: Request, res: Response) => {
        try {
            const { channelId } = req.params;
            const channel = await Channel.findOne({
                where: { id: channelId },
                relations: ['userChannels']
            });
            if (!channel)
                return res.status(404).json({
                    msg: 'Channel not found'
                });
            return res.status(200).send(channel);
        }catch(err) {
            //
        }
    }
    deleteChannel = async (req: Request, res: Response) => {
        try {
            const { channelId } = req.params;
            const channel = await Channel.query(`
                delete from channels
                where "channels"."id" = $1
                returning *;
            `, [channelId]);
            return res.status(200).send(channel[0][0]);
        }catch(err) {
            //
        }
    }

    banUser = async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;

        }catch(err) {
            //
        }
    }
    unbanUser = async (req: Request, res: Response) => {
        try {
        }catch(err) {
            //
        }
    }
    addAdmin = async (req: Request, res: Response) => {
        try {
        }catch(err) {
            //
        }
    }
    removeAdmin = async (req: Request, res: Response) => {
        try {
        }catch(err) {
            //
        }
    }
    giveRights = async (req: Request, res: Response) => {
        try {
            const { channelId, userId } = req.params;
        }catch(err) {
            //
        }
    }
    removeRights = async (req: Request, res: Response) => {
        try {
            const { channelId, userId } = req.params;
        }catch(err) {
            //
        }
    }
}