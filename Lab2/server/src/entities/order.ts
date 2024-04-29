import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { OrderDetails } from "./orderDetails";

export enum OrderStatus {
  PROCESSING = "processing",
  AWAITING_DISPATCH = "awaiting dispatch",
  DELIVERING = "delivering",
  READY_FOR_PICKUP = "ready for pickup",
  RECEIVED = "received",
  CANCELLED = "cancelled",
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PROCESSING,
  })
  status: OrderStatus;

  @ManyToOne(() => User, (user) => user.orders, {
    nullable: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order, {
    cascade: true,
  })
  orderDetails: OrderDetails[];

  @CreateDateColumn()
  createdAt: Date;
}
