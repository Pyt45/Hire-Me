import { UserChannelController } from "../controllers/UserChannelController";
import { Router } from "express";
import { JwtGuard } from "../middlewares/auth-guard.jwt";

const userChannelController = new UserChannelController();
const UserChannelRoute = Router();

// UserChannelRoute.get('/', JwtGuard, userChannelController.getAll)



export { UserChannelRoute as userChannelRoute };