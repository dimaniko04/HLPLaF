import { User } from "../entities/user";

export class UserDto {
  id: number;
  email: string;

  constructor(model: User) {
    this.id = model.id;
    this.email = model.email;
  }
}
