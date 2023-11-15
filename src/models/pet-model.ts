import { randomUUID } from "crypto";

interface PetModelInterface {
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

export class PetModel {
  public id: string;
  public orgId: string;
  public name: string;
  public age: number;
  public type: string;
  public size: string;
  public energy: number;
  public description: string;
  public adoptionRequirements: string[];
  public photos: string[];
  public createdAt: Date;

  constructor({
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
  }: PetModelInterface) {
    this.id = id ?? randomUUID();
    this.orgId = orgId;
    this.name = name;
    this.age = age;
    this.type = type;
    this.size = size;
    this.energy = energy;
    this.description = description;
    this.adoptionRequirements = adoptionRequirements;
    this.photos = photos;
    this.createdAt = new Date();
  }
}
