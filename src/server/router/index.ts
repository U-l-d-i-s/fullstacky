// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { userRouter } from "./user/userQueries";
import { personalRouter } from "./personal/personalQueries";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("user.", userRouter)
  .merge("personal.", personalRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
