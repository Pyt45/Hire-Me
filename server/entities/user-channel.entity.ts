import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Channel } from "./channel.entity";
import { User } from "./user.enitity";

export enum UserChannelRole {
    OWNER = 'owner',
    ADMIN = 'admin',
    USER = 'user',
};

@Entity('user_channel')
export class UserChannel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Channel, (e: Channel) => e.userChannels, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'channelId' })
    channel: Channel;

    @ManyToOne(() => User, (e: User) => e.joinedChannels, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    joinedUser: User;

    @Column({ type: 'enum', enum: UserChannelRole, default: UserChannelRole.USER })
    role: UserChannelRole;
}