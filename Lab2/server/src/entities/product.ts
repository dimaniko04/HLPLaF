import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category";
import { ProductInfo } from "./productInfo";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column("decimal", { precision: 12, scale: 2 })
  price: number;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
  })
  @JoinColumn()
  category: Category;

  @OneToMany(() => ProductInfo, (productInfo) => productInfo.product, {
    cascade: true,
  })
  productInfo: ProductInfo[];
}
