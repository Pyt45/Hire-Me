import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { Channel } from "./channel.entity";
import { Friendship } from "./friendship.enitity";
import { UserChannel } from "./user-channel.entity";

export enum UserStatus {
    ONLINE = 'online',
    OFFLINE = 'offline',
}

export enum UserRole {
    USER = 'user',
    OWNER = 'owner',
    ADMIN = 'admin'
}

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: true })
    username: string;

    @Column()
    email: string;
    
    @Column()
    password: string;

    @Column({ default: false })
    isTwoFaEnabled: boolean;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @Column({ type: 'enum', enum: UserStatus, default: UserStatus.OFFLINE })
    status: UserStatus;

    @Column({ nullable: true })
    avatar: string;

    @OneToMany(() => Friendship, (e: Friendship) => e.applicant)
    sentFriendRequests: Friendship[];

    @OneToMany(() => Friendship, (e: Friendship) => e.recipient)
    receivedFriendRequests: Friendship[];

    @OneToMany(() => Channel, (e: Channel) => e.owner)
    ownedChannels: Channel[];

    @OneToMany(() => UserChannel, (e: UserChannel) => e.joinedUser)
    joinedChannels: UserChannel[];
}