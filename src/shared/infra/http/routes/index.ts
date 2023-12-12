import { Router } from "express";

import usersRouter from "@modules/users/infra/http/routes/users.routes";
import passwordRouter from "@modules/users/infra/http/routes/Password.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/password", passwordRouter);

export default routes;