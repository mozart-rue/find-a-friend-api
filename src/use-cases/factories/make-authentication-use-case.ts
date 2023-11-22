import { InMemoryUserRepository } from "../../repositories/in-memory/in-memory-user-repository";
import { AuthenticateUseCase } from "../authenticate/authenticate";

export function makeAuthenticationUseCase() {
  const userRepository = new InMemoryUserRepository();
  const authenticateUseCase = new AuthenticateUseCase(userRepository);

  return authenticateUseCase;
}
