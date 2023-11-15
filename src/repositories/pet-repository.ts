import { PetModel } from "../models/pet-model";

export interface PetRepository {
  create(pet: PetModel): Promise<PetModel>;
}
