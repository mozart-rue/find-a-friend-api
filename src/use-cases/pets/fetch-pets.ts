import { PetModel } from "../../models/pet-model";
import { PetRepository } from "../../repositories/pet-repository";

interface FetchPetsUseCaseRequest {
  estate: string;
  city: string;
}

interface FetchPetsUseCaseResponse {
  pets: PetModel[];
}

export class FetchPetsUseCase {
  constructor(private petRepository: PetRepository) {}

  async exec({
    estate,
    city,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    if (estate.trim() === "" || city.trim() === "") {
      throw new Error();
    }

    const pets = await this.petRepository.fetchByCityAndEstate({
      estate,
      city,
    });
    return { pets };
  }
}
