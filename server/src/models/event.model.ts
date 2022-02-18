import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface EventInput {
  //eventId: string,
    user: UserDocument["_id"];
    eventTitle: string;
    categories: string;
    dateOfEvent: string;
    related: string;
    description: string;
    comments : string,
    tag: string;
}
export interface EventDocument extends EventInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
  }

const eventSchema = new mongoose.Schema(
    {
        eventId: {
            type: String,
            required: true,
            unique: true,
            default: () => `event_${nanoid()}`,
          },
      
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            eventTitle:{type:String, required:true},
            categories:{type:String, required:true},  //this should be an array
            dateOfEvent:{type:String, required:true},
            related:{type:String, required:false},   //this also should be an array
            description:{type:String, required:true},
            comments:{type:String, required:false},
            tag:{type:String, required:false},
    },
    {timestamps : true}
);


const EventModel = mongoose.model<EventDocument>("Event", eventSchema);

export default EventModel;