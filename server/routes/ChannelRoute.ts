import { Router } from "express";
import { ChannelController } from "../controllers/ChannelController";
import { JwtGuard } from "../middlewares/auth-guard.jwt";

const channelController = new ChannelController();
const ChannelRoute = Router();
// ChannelRoute.get('/', JwtGuard, channelController.getChannels);




export { ChannelRoute as channelRoute };