import { PetModel } from "../../models/pet-model";
import { PetRepository, FetchRequest } from "../pet-repository";

export class InMemoryPetRepository implements PetRepository {
  public items: PetModel[] = [];

  async create(pet: PetModel) {
    this.items.push(pet);
    return pet;
  }

  async fetchByCityAndEstate({
    estate,
    city,
    age,
    type,
    size,
    energy,
  }: FetchRequest) {
    const pets: PetModel[] = this.items.filter((item) => {
      return (
        city.toUpperCase() === item.org.city.toUpperCase() &&
        estate.toUpperCase() === item.org.estate.toUpperCase() &&
        (age ? age === item.age : true) &&
        (type ? type.toUpperCase() === item.type.toUpperCase() : true) &&
        (size ? size === item.size : true) &&
        (energy ? energy === item.energy : true)
      );
    });

    return pets;
  }
}
