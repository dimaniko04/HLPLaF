import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category";
import { Review } from "./review";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column("decimal", { precision: 12, scale: 2 })
  price: number;

  @Column()
  img: string;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
  })
  @JoinColumn()
  category: Category;

  @OneToMany(() => Review, (review) => review.product, {
    cascade: true,
  })
  reviews: Review[];
}
