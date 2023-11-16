import { PetModel } from "../models/pet-model";

export interface FetchRequest {
  estate: string;
  city: string;
  age?: number;
  type?: string;
  size?: string;
  energy?: number;
}

export interface PetRepository {
  create(pet: PetModel): Promise<PetModel>;
  fetchByCityAndEstate({
    estate,
    city,
    age,
    type,
    size,
    energy,
  }: FetchRequest): Promise<PetModel[]>;
}
