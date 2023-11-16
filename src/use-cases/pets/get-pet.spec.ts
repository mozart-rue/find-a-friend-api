import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetRepository } from "../../repositories/in-memory/in-memory-pet-repository";
import { GetPetUseCase } from "./get-pet";
import { InMemoryUserRepository } from "../../repositories/in-memory/in-memory-user-repository";
import { UserModel } from "../../models/user-model";
import { hash } from "bcryptjs";
import { PetModel } from "../../models/pet-model";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let userRepository: InMemoryUserRepository;
let petRepository: InMemoryPetRepository;
let sut: GetPetUseCase;

describe("Get Pet Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    petRepository = new InMemoryPetRepository();
    sut = new GetPetUseCase(petRepository);
  });

  it("should get a pet details", async () => {
    const org = new UserModel({
      name: "John Doe",
      email: "example@email.com",
      password: await hash("keyword123", 6),
      phoneNumber: "00 5555-5555",
      estate: "Santa Catarina",
      city: "Blumenau",
      neightborhood: "Vila Nova",
      cep: "89000-000",
    });

    const user = await userRepository.create(org);

    const petModel = new PetModel({
      org: user,
      name: `Cachorro`,
      age: 4,
      type: "Cachorro",
      size: "MEDIUM",
      energy: 5,
      description: "Cãozinho muito amigavel e legal",
      adoptionRequirements: [],
      photos: [],
    });

    const newPet = await petRepository.create(petModel);

    const { pet } = await sut.exec({ petId: newPet.id });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet).toEqual(
      expect.objectContaining({
        name: "Cachorro",
        org: expect.objectContaining({ city: "Blumenau" }),
      }),
    );
  });

  it("should not be able to get a pet details with wrong id", async () => {
    const org = new UserModel({
      name: "John Doe",
      email: "example@email.com",
      password: await hash("keyword123", 6),
      phoneNumber: "00 5555-5555",
      estate: "Santa Catarina",
      city: "Blumenau",
      neightborhood: "Vila Nova",
      cep: "89000-000",
    });

    const user = await userRepository.create(org);

    const petModel = new PetModel({
      org: user,
      name: `Cachorro`,
      age: 4,
      type: "Cachorro",
      size: "MEDIUM",
      energy: 5,
      description: "Cãozinho muito amigavel e legal",
      adoptionRequirements: [],
      photos: [],
    });

    const newPet = await petRepository.create(petModel);

    await expect(() =>
      sut.exec({ petId: "non-existent-id" }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
