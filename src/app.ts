import fastify from "fastify";
import { userRoutes } from "./http/controllers/user/route";

export const app = fastify();

app.register(userRoutes);
