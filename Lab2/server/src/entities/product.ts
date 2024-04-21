import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category";
import { ProductInfo } from "./product_info";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column("decimal", { precision: 12, scale: 2 })
  price: number;

  @OneToOne(() => Category)
  @JoinColumn()
  category: Category;

  @OneToMany(() => ProductInfo, (productInfo) => productInfo.product)
  productInfo: ProductInfo[];
}
