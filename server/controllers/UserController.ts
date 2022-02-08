import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import { User } from "../entities/user.enitity";
import { generateToken } from "../utils/generateToken";
import { JwtPayload } from "jsonwebtoken";
import { Friendship, FriendshipStatus } from "../entities/friendship.enitity";

interface IUser {
    nickname: string;
    isTwoFaEnabled: boolean;
}

export class UserController {
    getUsers = async (req: Request, res: Response) => {
        try {
            const users = await User.query(`
                select * from users
            `);
            return res.status(200).json(users);
        }catch(err: any) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }
    getLoggedUser = async (req: any, res: Response) => {
        try {
            const user = await User.query(`
                select "id",
                    "username",
                    "email",
                    "isTwoFaEnabled",
                    "role",
                    "status",
                    "avatar"
                from users
                where "users"."id" = $1
            `, [req.payload.userId]);
            return res.status(200).send(user[0]);
        }catch(err: any) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }
    getUserById = async (req: Request, res: Response) => {
        try {
            const user = await User.query(`
                select * from users
                where "users"."id" = $1
            `, [req.params.id]);
            if (!user)
                return res.status(404).json({
                    error: 'User not found'
                });
            return res.status(200).json(user);
        }catch(err: any) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }
    register = async (req: Request, res: Response) => {
        const { username, email, password } = req.body;

        try {
            let user = await User.query(`
                select * from users
                where "users"."email" = $1
            `, [email]);
            if (user.length != 0)
                return res.status(400).json({
                    error: 'email already had been used'
                });
            const salt = 10;
            const hash = await bcrypt.hash(password, salt);
            user = await User.query(`
                insert into users (username, email, password) values ($1, $2, $3)
                returning *;
            `, [username, email, hash]);
            return res.status(201).json({
                msg: 'success'
            })
            return res.redirect('http://localhost:3000');
        }catch(err: any) {
            console.log(err.message);
        }
    }
    login = async (req: Request, res: Response)=> {
        const { email, password } = req.body;
        try {
            let user = await User.query(`
                select * from users
                where "users"."email" = $1
            `, [email]);

            if (user.length == 0)
                return res.status(404).json({
                    error: 'User not found',
                });
            const isMatched = await bcrypt.compare(password, user[0].password);
            if (isMatched == false)
                return res.status(400).json({
                    error: 'Invalid credientiel'
                });
            const payload: JwtPayload = {
                userId: user[0].id,
            }
;
            const token = await generateToken(payload);
            res.cookie('token', token, {
                httpOnly: true
            });
            // res.cookie('user', JSON.stringify(user));
            // console.log(token);
            return res.status(200).json({
                msg: 'success',
                token: token
            });
            return res.redirect('http://localhost:3000/');
        }catch(err: any) {
            console.log(err.message);
            console.log("here");
        }
    }

    updateProfile = async (req: any, res: Response) => {
        try {
            const data: IUser = req.body;

            const row = await User.query(`
                update users
                set "nickname" = $1,
                    "isTwoFaEnabled" = $2
                where "users"."id" = $3
                returning *;
            `, [data.nickname, data.isTwoFaEnabled, req.payload.userId]);
            return res.status(200).send(row[0][0]);
        }catch(err) {
            //
        }
    }
    
    uploadAvatar = async (req: any, res: Response) => {
        try {
            const row = await User.query(`
                update users
                set "avatar" = $2
                where "users"."id" = $1
                returning *;
            `, [req.payload?.userId, 'http://localhost:4000/' + req.file?.filename]);
            return res.status(200).send(row[0][0]);
        }catch(err) {
            //
        }
    }

    // enableTwoFa = async (req: any, res: Response) => {
    //     try {
    //         const row = await User.query(`
    //             update users
    //             set "isTwoFaEnabled" = 'true'
    //             where "users"."id" = $1
    //             returning *;
    //         `, [req.payload?.userId]);
    //         return res.status(200).send(row[0][0]);
    //     }catch(err) {
    //         //
    //     }
    // }

    // disableTwoFa = async (req: any, res: Response) => {
    //     try {
    //         const row = await User.query(`
    //             update users
    //             set "isTwoFaEnabled" = 'false'
    //             where "users"."id" = $1
    //             returning *;
    //         `, [req.payload.userId]);
    //         return res.status(200).send(row[0][0])
    //     }catch(err) {
    //         //
    //     }
    // }

    sendFriendRequest = async (req: any, res: Response) => {
        try {
            const { recipientId } = req.params;
            const applicantId = req.payload.userId;
            const recipient = await User.findOne({
                where: { id: recipientId }
            });
            const applicant = await User.findOne({
                where: { id: applicantId }
            });
            if (!recipient)
                return res.status(404).json({
                    statusCode: 404,
                    error: 'User not found',
                    path: req.url,
                    method: req.method,
                    timestamp: new Date(),
                })
            let friendship = await Friendship.findOne({
                where: [
                    { applicant, recipient },
                    { recipient, applicant }
                ]
            });
            if (friendship)
                return res.status(400).json({
                    error: 'friendship exist'
                });
            friendship = await Friendship.create({
                applicant,
                recipient
            });
            await Friendship.save(friendship);
            return res.status(200).send(recipient);
        }catch(err) {
            //
        }
    }

    acceptFriendRequest = async (req: any, res: Response) => {
        try {
            const { applicantId } = req.params;
            const recipientId = req.payload.userId;

            const recipient = await User.findOne({
                where: { id: recipientId }
            });
            const applicant = await User.findOne({
                where: { id: applicantId }
            });
            if (!applicant)
                return res.status(404).json({
                    error: 'User not found'
                })
            const friendship = await Friendship.findOne({
                where: { applicant, recipient },
            });
            if (!friendship)
                return res.status(404).json({
                    error: 'friendship not exist'
                });
            await Friendship.query(`
                update friendship
                set "status" = $3
                where "friendship"."applicantId" = $1
                and "friendship"."recipientId" = $2
            `, [applicantId, recipientId, FriendshipStatus.ACCEPTED]);
            return res.status(200).send(applicant)
        }catch(err) {
            //
        }
    }

    blockUser = async (req: any, res: Response) => {
        try {
            const { recipientId } = req.params;
            const applicantId = req.payload.userId;

            const recipient = await User.findOne({
                where: { id: recipientId }
            });
            const applicant = await User.findOne({
                where: { id: applicantId }
            });
            if (!recipient)
                return res.status(404).json({
                    error: 'User not found'
                })
            let friendship = await Friendship.findOne({
                where: [
                    { applicant, recipient },
                    { recipient, applicant }
                ]
            });
            if (friendship) {
                friendship.status = FriendshipStatus.BLOCKED;
                await Friendship.save(friendship);
            }
            else {
                friendship = await Friendship.create({
                    applicant,
                    recipient,
                });
                friendship.status = FriendshipStatus.BLOCKED;
                await Friendship.save(friendship);
                // await Friendship.query(`
                //     insert into friendship (applicant, recipient, status)
                //     values ($1, $2, $3)
                // `, [applicant, recipient, FriendshipStatus.BLOCKED]);
            }
            return res.status(200).send(recipient);
        }catch(err) {
            //
        }
    }

    unblockUser = async (req: any, res: Response) => {
        try {
            const { recipientId } = req.params;
            const applicantId = req.payload.userId;
            const recipient = await User.findOne({
                where: { id: recipientId }
            });
            const applicant = await User.findOne({
                where: { id: applicantId }
            });
            if (!recipient)
                return res.status(404).json({
                    error: 'User not found'
                })
            const friendship = await Friendship.findOne({
                where: { applicant, recipient, status: FriendshipStatus.BLOCKED },
            });
            if (!friendship)
                return res.status(400).json({
                    error: 'friendship not exist'
                });
            await Friendship.query(`
                delete from friendship
                where "friendship"."applicantId" = $1
                and "friendship"."recipientId" = $2
                and "status" = $3
            `, [applicantId, recipientId, FriendshipStatus.BLOCKED]);
            return res.status(200).send(recipient);
        }catch(err) {
            //
        }
    }

    getFriends = async (req: any, res: Response) => {
        try {
            const userId = req.payload.userId;
            const row = await Friendship.query(`
                select * from users
                where "users"."id" in (select "applicantId" from friendship where "friendship"."recipientId" = $1 and "friendship"."status" = $2)
                or "users"."id" in (select "recipientId" from friendship where "friendship"."applicantId" = $1 and "friendship"."status" = $2)
            `, [userId, FriendshipStatus.ACCEPTED]);
            return res.status(200).send(row);
        }catch(err) {
            //
        }
    }

    getPendingRequest = async (req: any, res: Response) => {
        try {
            const userId = req.payload.userId;
            const row = await Friendship.query(`
                select * from users
                where "users"."id" in (select "applicantId" from friendship where "friendship"."recipientId" = $1 and "friendship"."status" = $2)
            `, [userId, FriendshipStatus.PENDING]);
            return res.status(200).send(row);
        }catch(err) {
            //
        }
    }

    getBlockedUser = async (req: any, res: Response) => {
        try {
            const userId = req.payload.userId;
            const row = await Friendship.query(`
                select * from users
                where "users"."id" in (select "recipientId" from friendship where "friendship"."applicantId" = $1 and "friendship"."status" = $2)
            `, [userId, FriendshipStatus.BLOCKED]);
            return res.status(200).send(row); 
        }catch(err) {
            //
        }
    }

    getNoRelationUsers = async (req: any, res: Response) => {
        try {
            const userId = req.payload.userId;
            const row = await Friendship.query(`
                select * from users
                where "users"."id" != $1
                and "users"."id" not in
                (select "applicantId" from friendship where "recipientId" = $1
                and "status" = 'pending' or "status" = 'accepted' or "status" = 'blocked')
                and "users"."id" not in
                (select "recipientId" from friendship where "applicantId" = $1
                and "status" = 'pending' or "status" = 'accepted' or "status" = 'blocked')
            `, [userId]);
            return res.status(200).send(row); 
        }catch(err) {
            //
        }
    }
}