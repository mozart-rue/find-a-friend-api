import { hash } from "bcryptjs";
import { UserModel } from "../../models/user-model";
import { UserRepository } from "../../repositories/user-repository";
import { EmailAlreadyRegisteredError } from "./errors/email-already-registered-error";

interface RegisterUseCaseRequest {
  id?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  estate: string;
  city: string;
  neightborhood: string;
  cep: string;
}

interface RegisterUseCaseResponse {
  user: UserModel;
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async exec({
    id,
    name,
    email,
    password,
    phoneNumber,
    estate,
    city,
    neightborhood,
    cep,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new EmailAlreadyRegisteredError();
    }

    const password_hash = await hash(password, 6);

    const newUser = new UserModel({
      id,
      name,
      email,
      password: password_hash,
      phoneNumber,
      estate,
      city,
      neightborhood,
      cep,
    });

    const user = await this.userRepository.create(newUser);

    return { user };
  }
}
