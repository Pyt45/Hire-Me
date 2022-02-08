import { Socket } from "socket.io";
import { User, UserStatus } from "../entities/user.enitity";
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class ConnectedUser extends User {
    sockets: Socket[] = [];
}

export class ChatService {
    private connectedUser: ConnectedUser[] = [];

    newConnection = async (socket: Socket, token: string) => {
        try {
            let payload: jwt.JwtPayload;
            payload = await jwt.verify(token, process.env.JWT_TOKEN || '') as jwt.JwtPayload;
            let user_sockets: any = this.connectedUser.find(u => u.id === payload.userId);
            if (user_sockets) {
                user_sockets.sockets.push(socket);
                this.connectedUser.push(user_sockets);
            }
            else {
                user_sockets = await User.findOne({
                    where: {
                        id: payload.userId
                    }
                })
                if (!user_sockets)
                    throw new Error('User not found');
                else {
                    user_sockets.sockets = [socket];
                    user_sockets.status = UserStatus.ONLINE;
                    user_sockets = await User.save(user_sockets);
                    this.connectedUser.push(user_sockets);
                }
                
                // this.connectedUser.push(user);
            }
        }catch(err: any) {
            console.log(err.message);
        }
    }
    disconnect = async (socket: Socket) => {
        let user = this.connectedUser.find(u => {
            if (u.sockets.find(s => s.id === socket.id) != null)
                return u;
        });
        if (user) {
            user.sockets.splice(user.sockets.indexOf(socket), 1);
            if (user.sockets.length == 0) {
                user.status = UserStatus.OFFLINE;
                await User.save(user);
                this.connectedUser.splice(this.connectedUser.indexOf(user), 1);
            }
        }
        try {
        }catch(err: any) {
            console.log(err.message);
        }
    }
}
