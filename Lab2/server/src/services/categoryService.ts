import { Repository } from "typeorm";
import { shopDataSource } from "../db";
import { Category } from "../entities/category";
import { ApiError } from "../exceptions/apiError";
import { ICreateCategory } from "../types/customRequestTypes";

class CategoryService {
  readonly categoryRepo: Repository<Category>;

  constructor() {
    this.categoryRepo = shopDataSource.getRepository(Category);
  }

  async getAll() {
    return this.categoryRepo.find();
  }

  async getOne(id: number) {
    const category = await this.categoryRepo.findOne({ where: { id: id } });

    if (!category) {
      throw ApiError.BadRequest(`No category with id ${id}`);
    }
    return category;
  }

  async create(createCategory: ICreateCategory) {
    const isExists = await this.categoryRepo.findOne({
      where: { name: createCategory.name },
    });

    if (isExists) {
      throw ApiError.BadRequest("Category already exists");
    }
    const category = this.categoryRepo.create(createCategory);
    return this.categoryRepo.save(category);
  }

  async delete(id: number) {
    const category = await this.categoryRepo.findOne({ where: { id: id } });

    if (!category) {
      throw ApiError.BadRequest(`No category with id ${id}`);
    }
    return this.categoryRepo.delete(id);
  }
}

export const categoryService = new CategoryService();
