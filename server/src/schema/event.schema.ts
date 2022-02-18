import { object, string, TypeOf } from "zod";

const payload = {
  body: object({
    eventTitle: string({
      required_error: "Title is required",
    }),  
    categories: string({
      required_error : "Categories is required",
    }),
    dateOfEvent: string({
      required_error : "Date of event is required",
    }),
    related: string(),
    description: string({
      required_error: "Description is required",
    }),
    comments: string(),
    tag: string(),
  }),
};

const params = {
    params: object({
      eventId: string({
      //  required_error : "eventId is required",
    }),
    eventTitle: string({
      //required_error : "eventTitle is required",
  }),
}),
  };
  
  export const createEventSchema = object({
    ...payload,
  });
  
  export const updateEventSchema = object({
    ...params,
    ...payload,
  });
  
  export const deleteEventSchema = object({
    ...params,
  });
  

export const getEventSchema = object({
  ...params,
});

export type CreateEventInput = TypeOf<typeof createEventSchema>;
export type UpdateEventInput = TypeOf<typeof updateEventSchema>;
export type ReadEventInput = TypeOf<typeof getEventSchema>;
export type DeleteEventInput = TypeOf<typeof deleteEventSchema>;
