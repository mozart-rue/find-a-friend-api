import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryUserRepository } from "../../repositories/in-memory/in-memory-user-repository";
import { compare } from "bcryptjs";

let userRepository: InMemoryUserRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new RegisterUseCase(userRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.exec({
      id: "userID-01",
      name: "John Doe",
      email: "example@email.com",
      password: "keyword123",
      phoneNumber: "00 5555-5555",
      estate: "Santa Catarina",
      city: "Blumenau",
      neightborhood: "Vila Nova",
      cep: "89000-000",
    });

    expect(user.id).toEqual("userID-01");
  });

  it("should not be able to register same email twice", async () => {
    await sut.exec({
      id: "userID-01",
      name: "John Doe",
      email: "example@email.com",
      password: "keyword123",
      phoneNumber: "00 5555-5555",
      estate: "Santa Catarina",
      city: "Blumenau",
      neightborhood: "Vila Nova",
      cep: "89000-000",
    });

    await expect(() =>
      sut.exec({
        id: "userID-01",
        name: "John Doe",
        email: "example@email.com",
        password: "keyword123",
        phoneNumber: "00 5555-5555",
        estate: "Santa Catarina",
        city: "Blumenau",
        neightborhood: "Vila Nova",
        cep: "89000-000",
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it("should encrypt the user password on registration", async () => {
    const { user } = await sut.exec({
      id: "userID-01",
      name: "John Doe",
      email: "example@email.com",
      password: "keyword123",
      phoneNumber: "00 5555-5555",
      estate: "Santa Catarina",
      city: "Blumenau",
      neightborhood: "Vila Nova",
      cep: "89000-000",
    });

    const isUserPasswordEncrypted = await compare("keyword123", user.password);

    expect(isUserPasswordEncrypted).toBe(true);
  });
});
