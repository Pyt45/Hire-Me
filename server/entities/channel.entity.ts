import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { UserChannel } from "./user-channel.entity";
import { User } from "./user.enitity";

export enum ChannelType {
    PUBLIC = 'public',
    PRIVATE = 'private',
};

@Entity('channels')
export class Channel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: ChannelType, default: ChannelType.PUBLIC })
    type: ChannelType;

    @ManyToOne(() => User, (e: User) => e.ownedChannels, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'ownerId' })
    owner: User;

    @OneToMany(() => UserChannel, (e: UserChannel) => e.channel)
    userChannels: UserChannel[];
}