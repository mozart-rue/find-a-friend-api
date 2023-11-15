import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { UserRepository } from "../../repositories/user-repository";
import { InMemoryUserRepository } from "../../repositories/in-memory/in-memory-user-repository";
import { UserModel } from "../../models/user-model";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

let userRepository: UserRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new AuthenticateUseCase(userRepository);
  });

  it("shoud be able to authenticate", async () => {
    const user = new UserModel({
      name: "John Doe",
      email: "example@email.com",
      password: await hash("keyword123", 6),
      phoneNumber: "00 5555-5555",
      estate: "Santa Catarina",
      city: "Blumenau",
      neightborhood: "Vila Nova",
      cep: "89000-000",
    });

    await userRepository.create(user);

    const authenticateUser = await sut.exec({
      email: "example@email.com",
      password: "keyword123",
    });

    expect(authenticateUser.user.id).toEqual(expect.any(String));
    expect(authenticateUser.user.name).toEqual("John Doe");
  });

  it("shoud not be able to authenticate with wrong email", async () => {
    const user = new UserModel({
      name: "John Doe",
      email: "example@email.com",
      password: await hash("keyword123", 6),
      phoneNumber: "00 5555-5555",
      estate: "Santa Catarina",
      city: "Blumenau",
      neightborhood: "Vila Nova",
      cep: "89000-000",
    });

    await userRepository.create(user);

    await expect(() =>
      sut.exec({
        email: "wrong@email.com",
        password: "keyword123",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("shoud not be able to authenticate with wrong password", async () => {
    const user = new UserModel({
      name: "John Doe",
      email: "example@email.com",
      password: await hash("keyword123", 6),
      phoneNumber: "00 5555-5555",
      estate: "Santa Catarina",
      city: "Blumenau",
      neightborhood: "Vila Nova",
      cep: "89000-000",
    });

    await userRepository.create(user);

    await expect(() =>
      sut.exec({
        email: "example@email.com",
        password: "not-a-password",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
