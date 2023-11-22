import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "../../../use-cases/errors/invalid-credentials-error";
import { makeAuthenticationUseCase } from "../../../use-cases/factories/make-authentication-use-case";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticationUseCase();

    const { user } = await authenticateUseCase.exec({
      email,
      password,
    });

    return reply.status(200).send();
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }
  }
}
