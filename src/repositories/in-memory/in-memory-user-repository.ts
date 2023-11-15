import { UserModel } from "../../models/user-model";
import { UserRepository } from "../user-repository";

export class InMemoryUserRepository implements UserRepository {
  public items: UserModel[] = [];

  async create(data: UserModel) {
    this.items.push(data);
    return data;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => {
      return item.email === email;
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string) {
    const user = this.items.find((item) => {
      return item.id === id;
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
