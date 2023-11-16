import { beforeEach, describe, expect, it } from "vitest";
import { FetchPetsUseCase } from "./fetch-pets";
import { InMemoryPetRepository } from "../../repositories/in-memory/in-memory-pet-repository";
import { PetModel } from "../../models/pet-model";
import { UserModel } from "../../models/user-model";
import { hash } from "bcryptjs";
import { InMemoryUserRepository } from "../../repositories/in-memory/in-memory-user-repository";
import { CityNotFilterError } from "../errors/city-not-filter-error";
import { EstateNotFilterError } from "../errors/estate-not-filter-error";

let userRepository: InMemoryUserRepository;
let petRepository: InMemoryPetRepository;
let sut: FetchPetsUseCase;

describe("Fetch Pets Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    petRepository = new InMemoryPetRepository();
    sut = new FetchPetsUseCase(petRepository);
  });

  it("should be able to fetch pets by city and estate", async () => {
    for (let i = 1; i < 4; i++) {
      const org = new UserModel({
        name: "John Doe",
        email: "example@email.com",
        password: await hash("keyword123", 6),
        phoneNumber: "00 5555-5555",
        estate: `Estado-${i}`,
        city: `Cidade-${i}`,
        neightborhood: "Bairro",
        cep: "89000-000",
      });

      await userRepository.create(org);
    }

    for (let i = 0; i < userRepository.items.length; i++) {
      const pet = new PetModel({
        org: userRepository.items[i],
        name: `Cachorro-${i}`,
        age: 4,
        type: "Cachorro",
        size: "MEDIUM",
        energy: 5,
        description: "Cãozinho muito amigavel e legal",
        adoptionRequirements: [],
        photos: [],
      });

      await petRepository.create(pet);
    }

    const { pets } = await sut.exec({
      estate: "Estado-1",
      city: "Cidade-1",
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([
      expect.objectContaining({
        org: expect.objectContaining({ city: "Cidade-1", estate: "Estado-1" }),
      }),
    ]);
  });

  it("should not be able to fetch pets without city filter", async () => {
    for (let i = 1; i < 4; i++) {
      const org = new UserModel({
        name: "John Doe",
        email: "example@email.com",
        password: await hash("keyword123", 6),
        phoneNumber: "00 5555-5555",
        estate: `Estado-${i}`,
        city: `Cidade-${i}`,
        neightborhood: "Bairro",
        cep: "89000-000",
      });

      await userRepository.create(org);
    }

    for (let i = 0; i < userRepository.items.length; i++) {
      const pet = new PetModel({
        org: userRepository.items[i],
        name: `Cachorro-${i}`,
        age: 4,
        type: "Cachorro",
        size: "MEDIUM",
        energy: 5,
        description: "Cãozinho muito amigavel e legal",
        adoptionRequirements: [],
        photos: [],
      });

      await petRepository.create(pet);
    }

    await expect(() =>
      sut.exec({
        estate: "Estado-1",
        city: "",
      }),
    ).rejects.toBeInstanceOf(CityNotFilterError);
  });

  it("should not be able to fetch pets without estate filter", async () => {
    for (let i = 1; i < 4; i++) {
      const org = new UserModel({
        name: "John Doe",
        email: "example@email.com",
        password: await hash("keyword123", 6),
        phoneNumber: "00 5555-5555",
        estate: `Estado-${i}`,
        city: `Cidade-${i}`,
        neightborhood: "Bairro",
        cep: "89000-000",
      });

      await userRepository.create(org);
    }

    for (let i = 0; i < userRepository.items.length; i++) {
      const pet = new PetModel({
        org: userRepository.items[i],
        name: `Cachorro-${i}`,
        age: 4,
        type: "Cachorro",
        size: "MEDIUM",
        energy: 5,
        description: "Cãozinho muito amigavel e legal",
        adoptionRequirements: [],
        photos: [],
      });

      await petRepository.create(pet);
    }

    await expect(() =>
      sut.exec({
        estate: "",
        city: "Cidade-1",
      }),
    ).rejects.toBeInstanceOf(EstateNotFilterError);
  });
});
