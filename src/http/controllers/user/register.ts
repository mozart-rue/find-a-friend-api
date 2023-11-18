import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterUseCase } from "../../../use-cases/factories/make-register-use-case";
import { EmailAlreadyRegisteredError } from "../../../use-cases/errors/email-already-registered-error";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    phoneNumber: z.string(),
    estate: z.string(),
    city: z.string(),
    neightborhood: z.string(),
    cep: z.string().regex(/\d{5}[-.\s]?\d{3}/g),
  });

  const {
    name,
    email,
    password,
    phoneNumber,
    estate,
    city,
    neightborhood,
    cep,
  } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.exec({
      name,
      email,
      password,
      phoneNumber,
      estate,
      city,
      neightborhood,
      cep,
    });
  } catch (err) {
    if (err instanceof EmailAlreadyRegisteredError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }

  return reply.status(201).send();
}
