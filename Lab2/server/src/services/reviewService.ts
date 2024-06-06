import { Repository } from "typeorm";
import { shopDataSource } from "../db";
import { ApiError } from "../exceptions/apiError";
import { toPaginatedList } from "../utils/toPaginatedList";
import { Review } from "../entities/review";
import { productService } from "./productService";
import { ReviewDto } from "../dto/reviewDto";

class ReviewService {
  readonly reviewRepo: Repository<Review>;

  constructor() {
    this.reviewRepo = shopDataSource.getRepository(Review);
  }

  async getAll(productId: number, page: number, limit: number) {
    const [reviews, total] = await this.reviewRepo.findAndCount({
      where: {
        productId: productId,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    const reviewsDto = reviews.map((r) => new ReviewDto(r));

    return toPaginatedList(reviewsDto, total, page, limit);
  }

  async create(userId: number, productId: number, text: string) {
    //throws error if not exist
    await productService.getOne(productId);

    const review = this.reviewRepo.create({
      userId,
      productId,
      text,
    });
    const createdReview = await this.reviewRepo.save(review);

    return new ReviewDto(createdReview);
  }

  async delete(id: number) {
    const review = await this.reviewRepo.findOne({ where: { id: String(id) } });

    if (!review) {
      throw ApiError.BadRequest(`No review with id ${id}`);
    }
    return this.reviewRepo.delete(id);
  }

  async update(id: number, text: string) {
    const review = await this.reviewRepo.findOne({
      where: { id: String(id) },
    });

    if (!review) {
      throw ApiError.BadRequest(`No review with id ${id}`);
    }
    const updatedReview = await this.reviewRepo.save(
      Object.assign(review, { text })
    );

    return new ReviewDto(updatedReview);
  }
}

export const reviewService = new ReviewService();
