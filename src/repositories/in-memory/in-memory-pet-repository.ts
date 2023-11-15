import { PetModel } from "../../models/pet-model";
import { PetRepository } from "../pet-repository";

export class InMemoryPetRepository implements PetRepository {
  public items: PetModel[] = [];

  async create(pet: PetModel) {
    this.items.push(pet);
    return pet;
  }
}
