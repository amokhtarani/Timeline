import { Express, Request, Response } from "express";
import {
  createProductHandler,
  getProductHandler,
  getProductsHandler,
  updateProductHandler,
} from "./controller/product.controller";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controller";
import {
  createUserHandler,
  getCurrentUser,
} from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schema/product.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

import {
  createEventSchema,
  deleteEventSchema,
  getEventSchema,
  updateEventSchema,
} from "./schema/event.schema";

import {
  createEventHandler,
  getEventHandler,
  updateEventHandler,
  getEventsHandler,
} from "./controller/event.controller";

import {
  createPersonSchema,
  deletePersonSchema,
  getPersonSchema,
  updatePersonSchema,
} from "./schema/person.schema";

import {
  createPersonHandler,
  getPersonHandler,
  updatePersonHandler,
  getPersonsHandler,
} from "./controller/person.controller";

import { 
  timelineHandler
} from "./controller/timeline.controller";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.get("/api/me", requireUser, getCurrentUser);

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);

// events
app.post(
  "/api/events",
  [requireUser, validateResource(createEventSchema)],
  createEventHandler
);

app.get(
  "/api/events/events",
  [requireUser],
  getEventsHandler
);

app.get(
  "/api/events/",
  [requireUser],
  getEventHandler
);

// persons
app.get(
  "/api/persons/persons",
  [requireUser],
  getPersonsHandler
);

app.get(
  "/api/persons",
  [requireUser],
  getPersonHandler
);

app.post(
  "/api/persons",
  [requireUser, validateResource(createPersonSchema)],
  createPersonHandler
);
 
app.put(
  "/api/persons",
  [requireUser, validateResource(createPersonSchema)],
  updatePersonHandler
);
//timeline
  app.get(
    "/api/timeline/",
    [requireUser],
    timelineHandler
  );
  app.get(
    "/api/timeline/dates",
    [requireUser],
    timelineHandler
  );
 
}

export default routes;
