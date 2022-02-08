import { Router, Request, Response } from "express";
import  multer from "multer";
import { extname } from "path";
// import { Socket } from "socket.io";
import { UserController } from "../controllers/UserController";
import { JwtGuard } from "../middlewares/auth-guard.jwt";


const UserRouter = Router();

const userController = new UserController();


const storage = multer.diskStorage({
    destination: function(req: Request, file: Express.Multer.File, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req: any, file: Express.Multer.File, cb) {
        cb(null, req.payload.userId + extname(file.originalname))
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
    if (file.mimetype === 'image/png'
        || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/jpeg') {
            cb(null, true);
        }
    else {
        cb(new Error("file must be a valid image"), false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

// user admin profile
UserRouter.get('/', userController.getUsers);
UserRouter.get('/me', JwtGuard, userController.getLoggedUser);
UserRouter.get('/:id', userController.getUserById);
// UserRouter.post('/register', userController.register);
// UserRouter.post('/login', userController.login);
UserRouter.put('/update', JwtGuard, userController.updateProfile);
UserRouter.put('/avatar', JwtGuard, upload.single('avatar'), userController.uploadAvatar);
// UserRouter.put('/enable-twofa', JwtGuard, userController.enableTwoFa);
// UserRouter.put('/disable-twofa', JwtGuard, userController.disableTwoFa);

// user friend request
// UserRouter.post('/send-friend-request/:recipientId', JwtGuard, userController.sendFriendRequest);
// UserRouter.patch('/accept-friend-request/:applicantId', JwtGuard, userController.acceptFriendRequest);
// UserRouter.post('/block-user/:recipientId', JwtGuard, userController.blockUser);
// UserRouter.post('/unblock-user/:recipientId', JwtGuard, userController.unblockUser);

// list user relation
// UserRouter.get('/friend/list', JwtGuard, userController.getFriends);
// UserRouter.get('/friend/pending-request', JwtGuard, userController.getPendingRequest);
// UserRouter.get('/friend/no-relation', JwtGuard, userController.getNoRelationUsers);
// UserRouter.get('/friend/blocked-user', JwtGuard, userController.getBlockedUser);

export { UserRouter as userRouter };
