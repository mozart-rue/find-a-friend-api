import { PetModel } from "../models/pet-model";

export interface FetchRequest {
  estate: string;
  city: string;
}

export interface PetRepository {
  create(pet: PetModel): Promise<PetModel>;
  fetchByCityAndEstate({ estate, city }: FetchRequest): Promise<PetModel[]>;
}
