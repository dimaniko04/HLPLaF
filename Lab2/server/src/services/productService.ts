import { In, Not, Repository } from "typeorm";
import { shopDataSource } from "../db";
import { Product } from "../entities/product";
import { ApiError } from "../exceptions/apiError";
import { ICreateProduct } from "../types/customRequestTypes";
import { categoryService } from "./categoryService";
import { FileHelper } from "../utils/FileHelper";
import { toPaginatedList } from "../utils/toPaginatedList";
import { Order } from "../entities/order";

class ProductService {
  readonly productRepo: Repository<Product>;

  constructor() {
    this.productRepo = shopDataSource.getRepository(Product);
  }

  async getAll(page: number, limit: number) {
    const [products, total] = await this.productRepo.findAndCount({
      relations: {
        productInfo: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return toPaginatedList(products, total, page, limit);
  }

  async getOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id: id },
      relations: {
        productInfo: true,
      },
    });

    if (!product) {
      throw ApiError.BadRequest(`No product with id ${id}`);
    }
    return product;
  }

  async getUserRecommendations(userId: number) {
    const categories = await shopDataSource
      .createQueryBuilder()
      .from(Order, "order")
      .innerJoin("order_details", "detail", "detail.orderId = order.id")
      .innerJoin("products", "product", "detail.productId = product.id")
      .innerJoin("categories", "category", "product.categoryId = category.id")
      .orderBy("order.createdAt", "DESC")
      .select("category.name")
      .getMany();

    console.log(categories);
  }

  async getByIds(ids: number[]) {
    const products = await shopDataSource
      .getRepository(Product)
      .find({ where: { id: In(ids) } });

    if (products.length != ids.length) {
      const existingIds = products.map((p) => p.id);
      const nonExistentIds = ids.filter((id) => !existingIds.includes(id));

      throw ApiError.BadRequest(`No product(s) with id(s) ${nonExistentIds}`);
    }

    return products;
  }

  async create(createProduct: ICreateProduct & { img: string }) {
    const isExists = await this.productRepo.findOne({
      where: { name: createProduct.name },
    });

    if (isExists) {
      throw ApiError.BadRequest("Product already exists");
    }

    const category = await categoryService.getOne(createProduct.category);
    const product = this.productRepo.create({
      ...createProduct,
      category: category,
    });

    return this.productRepo.save(product);
  }

  async delete(id: number) {
    const product = await this.productRepo.findOne({ where: { id: id } });

    if (!product) {
      throw ApiError.BadRequest(`No product with id ${id}`);
    }
    await FileHelper.removeFile(product.img);
    return this.productRepo.delete(id);
  }

  async update(id: number, updateProduct: ICreateProduct & { img?: string }) {
    const product = await this.productRepo.findOne({
      where: { id: id },
    });

    if (!product) {
      throw ApiError.BadRequest(`No product with id ${id}`);
    }

    const isExists = await this.productRepo.findOne({
      where: { name: updateProduct.name, id: Not(id) },
    });

    if (isExists) {
      throw ApiError.BadRequest(
        `Product with name ${updateProduct.name} already exists`
      );
    }
    if (updateProduct.img) {
      await FileHelper.removeFile(product.img);
    } else {
      updateProduct.img = product.img;
    }

    const category = await categoryService.getOne(updateProduct.category);

    return this.productRepo.save(
      Object.assign(product, { ...updateProduct, category: category })
    );
  }
}

export const productService = new ProductService();
