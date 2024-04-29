import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order";
import { Product } from "./product";

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn()
  orderDetailsId: number;

  @Column({ nullable: false })
  orderId: number;

  @Column({ nullable: false })
  productId: number;

  @Column({ default: 1 })
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderDetails, {
    nullable: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  order: Order;

  @ManyToOne(() => Product, {
    nullable: false,
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  product: Product;
}
