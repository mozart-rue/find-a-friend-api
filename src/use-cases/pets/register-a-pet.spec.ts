import { beforeEach, describe, expect, it } from "vitest";
import { ResgisterAPetUseCase } from "./register-a-pet";
import { InMemoryPetRepository } from "../../repositories/in-memory/in-memory-pet-repository";
import { InMemoryUserRepository } from "../../repositories/in-memory/in-memory-user-repository";
import { hash } from "bcryptjs";
import { UserModel } from "../../models/user-model";

let userRepository: InMemoryUserRepository;
let petRepository: InMemoryPetRepository;
let sut: ResgisterAPetUseCase;

describe("Register a pet use case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    petRepository = new InMemoryPetRepository();
    sut = new ResgisterAPetUseCase(petRepository, userRepository);
  });

  it("should be able to register a pet", async () => {
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

    const { pet } = await sut.exec({
      orgId: user.id,
      name: "rufus",
      age: 2,
      type: "cachorro",
      size: "TALL",
      energy: 5,
      description: "é um cachorro muito legal e divertido para se ter ",
      adoptionRequirements: [],
      photos: [],
    });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet.name).toEqual("rufus");
    expect(pet.orgId).toEqual(org.id);
  });
});
