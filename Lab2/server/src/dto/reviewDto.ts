import { Review } from "../entities/review";

export class ReviewDto {
  id: string;
  date: Date;
  text: string;

  constructor(model: Review) {
    this.id = model.id;
    this.date = model.date;
    this.text = model.text;
  }
}
