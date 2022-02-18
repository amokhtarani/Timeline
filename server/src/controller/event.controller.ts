import { Request, Response } from "express";
import {
  CreateEventInput,
  UpdateEventInput,
} from "../schema/event.schema";
import {
  createEvent,
  deleteEvent,
  findAndUpdateEvent,
  findEvent,
  findAllEvents,
  findEventByTitle,
  findEventById,
} from "../service/event.service";

export async function createEventHandler(
  req: Request<{}, {}, CreateEventInput["body"]>,
  res: Response
) {
  //***   FIX THIS  should come from valid session */
  const userId = "61ef0666d68ec46f8eac609e" ;   //res.locals.user._id;
  const body = req.body;

  const event = await createEvent({ ...body, user: userId });

  return res.send(event);
}

export async function updateEventHandler(
  req:Request,
//  req: Request<UpdateEventInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const id = req.query.eventId;
  const update = req.body;

  const event = await findEvent({ id });

  if (!event) {
    return res.sendStatus(404);
  }

  if (String(event.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedEvent = await findAndUpdateEvent({ id }, update, {
    new: true,
  });

  return res.send(updatedEvent);
}

export async function getEventHandler(
  req:Request,
//  req: Request<UpdateEventInput["params"]>,
  res: Response
) {
  let event;
  if(req.query.eventTitle){
  const title = req.query.eventTitle;
  //console.log(title);
   event = await findEventByTitle( {title} );
  }
  if(req.query.id) {
    const id = req.query.id;
    event = await findEventById( {id} );
  }
  if (!event) {
    console.log(event + "  not found")
    return res.sendStatus(404);
  }

  return res.send(event);

}

export async function getEventsHandler(
  req:Request,
//  req: Request<UpdateEventInput["params"]>,
  res: Response
) {
   const events = await findAllEvents({  });

  if (!events) {
    return res.sendStatus(404);
  }
  const eventsMap = new Map();
  events.forEach(event => {
    eventsMap.set(event.eventTitle, event.dateOfEvent);
  });
  var obj = Object.fromEntries(eventsMap);
  var jsonString = JSON.stringify(obj);
 
  console.log(JSON.parse(jsonString));
  return res.send(JSON.parse(jsonString));
 
}
export async function deleteEventHandler(
  req:Request,
//  req: Request<UpdateEventInput["params"]>,
  res: Response
) {
    const userId = res.locals.user._id;
    const eventId = req.params.eventId;
    const event = await findEvent({ eventId });
  
    if (!event) {
      return res.sendStatus(404);
    }
  
  if (String(event.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteEvent({ eventId });

  return res.sendStatus(200);
}
