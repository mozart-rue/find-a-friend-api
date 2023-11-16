import { PetModel } from "../../models/pet-model";
import { PetRepository } from "../../repositories/pet-repository";
import { CityNotFilterError } from "../errors/city-not-filter-error";
import { EstateNotFilterError } from "../errors/estate-not-filter-error";

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
    if (estate.trim() === "") {
      throw new EstateNotFilterError();
    }

    if (city.trim() === "") {
      throw new CityNotFilterError();
    }

    const pets = await this.petRepository.fetchByCityAndEstate({
      estate,
      city,
    });
    return { pets };
  }
}
