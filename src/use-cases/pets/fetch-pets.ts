import { PetModel } from "../../models/pet-model";
import { PetRepository } from "../../repositories/pet-repository";
import { CityNotFilterError } from "../errors/city-not-filter-error";
import { EstateNotFilterError } from "../errors/estate-not-filter-error";

interface FetchPetsUseCaseRequest {
  estate: string;
  city: string;
  age?: number;
  type?: string;
  size?: string;
  energy?: number;
}

interface FetchPetsUseCaseResponse {
  pets: PetModel[];
}

export class FetchPetsUseCase {
  constructor(private petRepository: PetRepository) {}

  async exec({
    estate,
    city,
    age,
    type,
    size,
    energy,
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
      age,
      type,
      size,
      energy,
    });
    return { pets };
  }
}
