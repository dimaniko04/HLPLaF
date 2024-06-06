import { shopDataSource } from "../db";
import { Category } from "../entities/category";
import { Order } from "../entities/order";
import { Product } from "../entities/product";

class RecommendationService {
  async getUserRecommendations(userId: number) {
    const categories = await shopDataSource
      .createQueryBuilder()
      .select("category.name")
      .from(Order, "order")
      .innerJoin("order_details", "detail", "detail.orderId = order.id")
      .innerJoin("product", "product", "detail.productId = product.id")
      .innerJoin("category", "category", "product.categoryId = category.id")
      .where("order.userId = :id", { id: userId })
      .distinct(true)
      .getRawMany();

    if (!categories.length) {
      return [];
    }

    const res = await shopDataSource
      .createQueryBuilder()
      .from(
        (qb) =>
          qb
            .from(Product, "product")
            .select("product")
            .addSelect("ROW_NUMBER() OVER (PARTITION BY category.name)", "row")
            .innerJoinAndSelect(
              "category",
              "category",
              "product.categoryId = category.id"
            )
            .where("category.name IN (:...names)", {
              names: categories.map((c) => c.category_name),
            }),
        "products_counted"
      )
      .where("row < 3")
      .getRawMany();

    return res.map((item) => {
      const product = new Product();
      const category = new Category();

      product.id = item.product_id;
      product.name = item.product_name;
      product.price = item.product_price;
      product.img = item.product_img;

      category.id = item.category_id;
      category.name = item.category_name;

      product.category = category;

      return product;
    });
  }
}

export const recommendationService = new RecommendationService();
