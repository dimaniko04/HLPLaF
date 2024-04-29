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

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

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
