import { app } from "./app";
import { env } from "./environment";

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.info(`HTTP Server is running on port: ${env.PORT}`);
  });
