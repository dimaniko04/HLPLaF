import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order";
import { Review } from "./review";
import { Favorite } from "./favorite";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Order, (order) => order.user, {
    cascade: true,
  })
  orders: Order[];

  @OneToMany(() => Order, (order) => order.user, {
    cascade: true,
  })
  reviews: Review[];

  @OneToMany(() => Favorite, (favorite) => favorite.user, {
    cascade: true,
  })
  favorites: Favorite[];
}
