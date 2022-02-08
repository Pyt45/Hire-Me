import { AdminController } from "../controllers/AdminController";
import { Router } from "express";
import { JwtGuard } from "../middlewares/auth-guard.jwt";
import { OwnerGuard } from "../middlewares/auth-guard.owner";

const adminController = new AdminController();
const AdminRoute = Router();

AdminRoute.get('/users', JwtGuard, OwnerGuard, adminController.getUsers);
AdminRoute.get('/users/:userId', JwtGuard, OwnerGuard, adminController.getUser);
AdminRoute.delete('/delete-user/:userId', JwtGuard, OwnerGuard, adminController.deleteUser);

AdminRoute.get('/channels', JwtGuard, OwnerGuard, adminController.getChannels);
AdminRoute.get('/channels/:channelId', JwtGuard, OwnerGuard, adminController.getChannel);
AdminRoute.delete('/channels/:channelId', JwtGuard, OwnerGuard, adminController.deleteChannel);

AdminRoute.patch('/ban-user/:userId', JwtGuard, OwnerGuard, adminController.banUser);
AdminRoute.patch('/unban-user/:userId', JwtGuard, OwnerGuard, adminController.unbanUser);
AdminRoute.patch('/add-admin/:userId', JwtGuard, OwnerGuard, adminController.addAdmin);
AdminRoute.patch('/remove-admin/:userId', JwtGuard, OwnerGuard, adminController.removeAdmin);
AdminRoute.patch('/give-rights/:channelId/:userId', JwtGuard, OwnerGuard, adminController.giveRights);
AdminRoute.patch('/remove-rights/:channelId/:userId', JwtGuard, OwnerGuard, adminController.removeRights);

export { AdminRoute as adminRoute };