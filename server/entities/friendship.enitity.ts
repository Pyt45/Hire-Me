import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./user.enitity";

export enum FriendshipStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    BLOCKED = 'blocked',
};

@Entity('friendship')
export class Friendship extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (e: User) => e.sentFriendRequests, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'applicantId' })
    applicant: User;

    @ManyToOne(() => User, (e: User) => e.receivedFriendRequests, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'recipientId' })
    recipient: User;

    @Column({ type: 'enum', enum: FriendshipStatus, default: FriendshipStatus.PENDING })
    status: FriendshipStatus;
}