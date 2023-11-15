import { PetModel } from "../../models/pet-model";
import { PetRepository } from "../../repositories/pet-repository";
import { UserRepository } from "../../repositories/user-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface ResgisterAPetRequest {
  id?: string;
  orgId: string;
  name: string;
  age: number;
  type: string;
  size: string;
  energy: number;
  description: string;
  adoptionRequirements: string[];
  photos: string[];
}

interface ResgisterAPetResponse {
  pet: PetModel;
}

export class ResgisterAPetUseCase {
  constructor(
    private petRepository: PetRepository,
    private userRepository: UserRepository,
  ) {}

  async exec({
    id,
    orgId,
    name,
    age,
    type,
    size,
    energy,
    description,
    adoptionRequirements,
    photos,
  }: ResgisterAPetRequest): Promise<ResgisterAPetResponse> {
    const org = await this.userRepository.findById(orgId);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    const pet = new PetModel({
      id,
      orgId,
      name,
      age,
      type,
      size,
      energy,
      description,
      adoptionRequirements,
      photos,
    });

    await this.petRepository.create(pet);

    return { pet };
  }
}
