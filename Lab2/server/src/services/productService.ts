import { Not, Repository } from "typeorm";
import { shopDataSource } from "../db";
import { Product } from "../entities/product";
import { ApiError } from "../exceptions/apiError";
import { ICreateProduct } from "../types/customRequestTypes";
import { categoryService } from "./categoryService";
import { FileHelper } from "../utils/FileHelper";

class ProductService {
  readonly productRepo: Repository<Product>;

  constructor() {
    this.productRepo = shopDataSource.getRepository(Product);
  }

  async getAll() {
    return this.productRepo.find({
      relations: {
        productInfo: true,
      },
    });
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
