import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { Product } from "./product";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.reviews, {
    nullable: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Product, (product) => product.reviews, {
    nullable: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  product: Product;

  @Column()
  productId: number;

  @Column()
  text: string;

  @CreateDateColumn()
  date: Date;
}
