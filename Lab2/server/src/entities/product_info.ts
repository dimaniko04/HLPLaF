import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";

@Entity()
export class ProductInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Product, (product) => product, {
    onDelete: "CASCADE",
    nullable: false,
    orphanedRowAction: "delete",
  })
  product: Product;
}
