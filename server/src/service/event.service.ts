import {
    FilterQuery,
    QueryOptions,
    UpdateQuery,
  } from "mongoose";
  import EventModel, { EventDocument, EventInput } from "../models/event.model";

export async function createEvent(
    input: EventInput
  ) {
 console.log(input);
     return EventModel.create(input);
 
  }

  export async function findEvent(
    query: FilterQuery<EventDocument>,
    options: QueryOptions = { lean: true }
  ) {
    return EventModel.findOne(query, {}, options);
  }
  
  export async function findAllEvents(
    query: FilterQuery<EventDocument>,
    options: QueryOptions = { lean: true }
  ) {
    return EventModel.find(query, {}, options);
  }
  
  export async function findEventByTitle(
    query: FilterQuery<EventDocument>,
    options: QueryOptions = { lean: true }
  ) {
   // console.log(query.title);
    return EventModel.find({eventTitle:  { $regex: '.*' + query.title + '.*' } });
  }
  
  export async function findEventById(
    query: FilterQuery<EventDocument>,
    options: QueryOptions = { lean: true }
  ) {
   // console.log(query.title);
    return EventModel.find({_id:  query.id });
  }
  
  export async function findAndUpdateEvent(
    query: FilterQuery<EventDocument>,
    update: UpdateQuery<EventDocument>,
    options: QueryOptions
  ) {
    return EventModel.findOneAndUpdate(query, update, options);
  }
  
  export async function deleteEvent(query: FilterQuery<EventDocument>) {
    return EventModel.deleteOne(query);
  }
  