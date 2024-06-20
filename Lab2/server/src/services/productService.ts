import { In, Not, Repository } from "typeorm";
import { shopDataSource } from "../db";
import { Product } from "../entities/product";
import { ApiError } from "../exceptions/apiError";
import { ICreateProduct } from "../types/customRequestTypes";
import { categoryService } from "./categoryService";
import { FileHelper } from "../utils/FileHelper";
import { toPaginatedList } from "../utils/toPaginatedList";
import { ProductDto } from "../dto/productDto";
import { Favorite } from "../entities/favorite";
import { Review } from "../entities/review";

class ProductService {
  readonly productRepo: Repository<Product>;

  constructor() {
    this.productRepo = shopDataSource.getRepository(Product);
  }

  async getAll(userId: number, page: number, limit: number) {
    const products = await this.productRepo
      .createQueryBuilder("product")
      .select(`product.*, f.id as "isFavorite"`)
      .leftJoin(
        (qb) =>
          qb.from(Favorite, "favorite").where("favorite.userId = :id", {
            id: userId,
          }),
        "f",
        `"f"."productId" = product.id`
      )
      .skip((page - 1) * limit)
      .take(limit)
      .getRawMany();
    const total = await this.productRepo.count();

    const productDtos = products.map(
      (p) => new ProductDto({ ...p, isFavorite: !!p.isFavorite })
    );

    return toPaginatedList(productDtos, total, page, limit);
  }

  async getOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id: id },
    });

    if (!product) {
      throw ApiError.BadRequest(`No product with id ${id}`);
    }
    return product;
  }

  async getUserFavorites(userId: number, page: number, limit: number) {
    const [products, total] = await this.productRepo.findAndCount({
      relations: {
        favorites: true,
      },
      take: limit,
      skip: (page - 1) * limit,
      where: { favorites: { userId } },
    });
    const productDtos = products.map(
      (p) => new ProductDto({ ...p, isFavorite: true })
    );

    return toPaginatedList(productDtos, total, page, limit);
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
