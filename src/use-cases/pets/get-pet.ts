import { PetModel } from "../../models/pet-model";
import { PetRepository } from "../../repositories/pet-repository";

interface GetPetUseCaseRequest {
  petId: string;
}

interface GetPetUseCaseResponse {
  pet: PetModel;
}

export class GetPetUseCase {
  constructor(private petRespository: PetRepository) {}

  async exec({ petId }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petRespository.getPetById(petId);

    if (!pet) {
      throw new Error();
    }

    return { pet };
  }
}
