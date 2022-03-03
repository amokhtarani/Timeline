import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface PersonInput {
 // personId: string,
  user: UserDocument["_id"];
  name: string;
  title: string;
  categories: string;
  dateOfBirth: string;
  dateOfDeath: string;
  description: string;
  nationality : string;
  related : string;
  comments : string;
  tag: string;
  dobera: string;  //CE or BCE
  dodera: string;  //CE or BCE

 }
export interface PersonDocument extends PersonInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
  }
var personSchema = new mongoose.Schema({
      // personId: {
      //   type: String,
      //   required: true,
      //   unique: true,
      //   default: () => `person_${nanoid()}`,
      // },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name:{type:String, required:true},
        title:{type:String, required:true},
        categories:{type:String, required:true},
        dateOfBirth:{type:String, required:false},
        dateOfDeath:{type:String, required:false},
        description:{type:String, required:false},
        nationality:{type:String, required:false},
        related:{type:String, required:false},
        comments:{type:String, required:false},
        tag:{type:String, required:false},
        dodera:{type:String, required:true},
        dobera:{type:String, required:true},
      },
      {timestamps : true}
  );


const PersonModel = mongoose.model<PersonDocument>("persons", personSchema);

export default PersonModel;