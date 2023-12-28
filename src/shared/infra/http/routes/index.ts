import { Router } from "express";

// Rotas
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import passwordRouter from "@modules/users/infra/http/routes/Password.routes";
import sessionsRouter from "@modules/users/infra/http/routes/Sessions.routes";
import emailRouter from "@modules/users/infra/http/routes/Email.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/password", passwordRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/email", emailRouter);

export default routes;