import {
    FilterQuery,
    QueryOptions,
    UpdateQuery,
  } from "mongoose";
  import PersonModel, { PersonDocument, PersonInput } from "../models/person.model";

export async function createPerson(
    input: PersonInput
  ) {
     return PersonModel.create(input);
  }

  export async function findPerson(
    query: FilterQuery<PersonDocument>,
    options: QueryOptions = { lean: true }
  ) {
     return PersonModel.findOne(query, {}, options);
  }
  
  export async function findPersonById(
    query: FilterQuery<PersonDocument>,
    options: QueryOptions = { lean: true }
  ) {
      return PersonModel.find({_id: query.id });
  }

  export async function findPersonByName(
    query: FilterQuery<PersonDocument>,
    options: QueryOptions = { lean: true }
  ) {
     return PersonModel.find({name:  { $regex: '.*' + query.personName + '.*' } });
  }
  

  export async function findAllPersons(
    query: FilterQuery<PersonDocument>,
    options: QueryOptions = { lean: true }
  ) {
    return PersonModel.find(query, {}, options);
  }
  
  export async function findAndUpdatePerson(
    query: FilterQuery<PersonDocument>,
    update: UpdateQuery<PersonDocument>,
    options: QueryOptions
  ) {
    // console.log(JSON.stringify(query));
    // console.log(JSON.stringify(update));
     return PersonModel.findByIdAndUpdate(query.id, update, options);
  }
  
  export async function deletePerson(query: FilterQuery<PersonDocument>) {
    return PersonModel.deleteOne(query);
  }
  