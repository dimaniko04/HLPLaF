import { Repository } from "typeorm";
import { shopDataSource } from "../db";
import { ApiError } from "../exceptions/apiError";
import { productService } from "./productService";
import { Favorite } from "../entities/favorite";

class FavoriteService {
  readonly favoriteRepo: Repository<Favorite>;

  constructor() {
    this.favoriteRepo = shopDataSource.getRepository(Favorite);
  }

  async addToFavorite(userId: number, productId: number) {
    //throws error if not exist
    await productService.getOne(productId);

    const review = this.favoriteRepo.create({
      userId,
      productId,
    });
    const created = await this.favoriteRepo.save(review);

    return created;
  }

  async removeFromFavorite(userId: number, productId: number) {
    const favorite = await this.favoriteRepo.findOne({
      where: {
        userId: userId,
        productId: productId,
      },
    });

    if (!favorite) {
      throw ApiError.BadRequest(`No favorite product with id ${productId}`);
    }
    return this.favoriteRepo.delete({ userId, productId });
  }
}

export const favoriteService = new FavoriteService();
