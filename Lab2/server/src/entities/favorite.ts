import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { Product } from "./product";

@Entity()
@Index(["userId", "productId"], { unique: true })
export class Favorite {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.favorites, {
    nullable: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Product, (product) => product.favorites, {
    nullable: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  product: Product;

  @Column()
  productId: number;
}
