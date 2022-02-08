import express, { Application, Request, Response } from 'express';
import http from 'http';
import * as socketio from 'socket.io';
import "reflect-metadata";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import { User } from './entities/user.enitity';
import { Friendship } from './entities/friendship.enitity';
import { userRouter } from './routes/UserRoute';
import cors from 'cors';
import { Channel } from './entities/channel.entity';
import { UserChannel } from './entities/user-channel.entity';
import { adminRoute } from './routes/AdminRoute';
import { channelRoute } from './routes/ChannelRoute';
import { userChannelRoute } from './routes/UserChannelRoute';
import { ChatService } from './utils/handleConnection';
import  passport from "passport";
import { Strategy } from 'passport-github2';
import { log } from 'console';

dotenv.config();

passport.serializeUser((user, done: any) => {
    done(null, user);
});


passport.deserializeUser((user: User, done: any) => {
    done(null, user);
});

passport.use(new Strategy({
    clientID: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_SECRET_ID || '',
    callbackURL: 'http://localhost:4000/auth/github/callback'
},
    function(accessToken: any, refreshToken: any, profile: any, done: any){
        // console.log(profile);
        return done(null, profile);
    }
))

export const bootstrap = async () => {
    const connection = await createConnection({
        type: 'postgres',
        host: '192.168.99.118',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        entities: [User, Friendship, Channel, UserChannel],
        synchronize: true,
    });

    const app: Application = express();
    const server = http.createServer(app);
    const io = new socketio.Server(server, {
        cors: {
            origin: '*',
        }
    });
    // app.use(express.static('public'));
    app.use(passport.initialize());
    app.use(express.json());
    app.use(cookieParser());
    // app.use(express.static('uploads'));
    app.use(cors({
        origin: '*',
    }));

    app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

    app.get('/auth/error', (req, res) => res.send('Unknown Error'));

    app.get('/auth/github/callback', passport.authenticate('github', { 
        failureRedirect: '/auth/error'}),
        (req: Request, res: Response) => {
            console.log(req.user);
            res.redirect('/');
        });

    app.get('/', (req: Request, res: Response) => {
        log("=======================");
        console.log(req.user);
        log("=======================");
        res.send('hello from server');
    })
    // app.use('/api/admin', adminRoute);
    // app.use('/api/users', userRouter);
    // app.use('/api/channels', channelRoute);
    // app.use('/api/users-channel', userChannelRoute);

    // connecting users
    // io.use((socket, next) => {
    //     if (has(socket.handshake.query, 'token')) {
    //         if (process.env.JWT_TOKEN)
    //             jwt.verify(socket.handshake.query.token as string, process.env.JWT_TOKEN);
    //     } else {
    //         next(new Error('Authentication error'));
    //     }
    // })
    // io.on('connection', (socket) => {
    //     console.log("================================");
    //     console.log(socket);
    //     console.log(("==============================="));
        
    //     const cookie = socket.handshake.headers.cookie?.split('token=')[1];
    //     const chatService = new ChatService();
    //     // console.log(socket.handshake);
    //     if (cookie) {
    //         chatService.newConnection(socket, cookie as string);
    //         // socket.emit('user_connected', );
    //     }
    //     // console.log(cookie);
    //     // socket.on('connect_user', (user) => {
    //     //     const q = socket.handshake;
    //     //     console.log(q);
    //     // })
    //     socket.on('disconnect', () => {
    //         chatService.disconnect(socket);
    //     })
    // })
    
    server.listen(process.env.BACKEND_PORT, () => {
        console.log('server started on *:4000');
    });
    // return app;
}

bootstrap();