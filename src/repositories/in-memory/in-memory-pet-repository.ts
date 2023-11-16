import { PetModel } from "../../models/pet-model";
import { PetRepository, FetchRequest } from "../pet-repository";

export class InMemoryPetRepository implements PetRepository {
  public items: PetModel[] = [];

  async create(pet: PetModel) {
    this.items.push(pet);
    return pet;
  }

  async fetchByCityAndEstate({ estate, city }: FetchRequest) {
    const pets: PetModel[] = this.items.filter((item) => {
      return (
        city.toUpperCase() === item.org.city.toUpperCase() &&
        estate.toUpperCase() === item.org.estate.toUpperCase()
      );
    });

    return pets;
  }
}
