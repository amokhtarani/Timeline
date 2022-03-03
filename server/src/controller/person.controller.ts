import { Request, response, Response } from "express";
import {
  CreatePersonInput,
  UpdatePersonInput,
} from "../schema/person.schema";
import {
  createPerson,
  deletePerson,
  findAndUpdatePerson,
  findPerson,
  findAllPersons,
  findPersonByName,
  findPersonById,
} from "../service/person.service";

export async function createPersonHandler(
  req: Request<{}, {}, CreatePersonInput["body"]>,
  res: Response
) {
 //***   FIX THIS  should come from valid session */
  const userId = "61ef0666d68ec46f8eac609e" ; //res.locals.user._id;

  const body = req.body;

  const person = await createPerson({ ...body, user: userId });

  return res.send(person);
}

export async function updatePersonHandler(
  req:Request,
//  req: Request<UpdatePersonInput["params"]>,
  res: Response
) {
  
 
  const id = req.query.id;
  const update = req.body;

  const person = await findPersonById({ id });

  if (!person) {
    return res.sendStatus(404);
  }

  // if (String(person.user) !== userId) {
  //   return res.sendStatus(403);
  // }

  const updatedPerson =  await findAndUpdatePerson({ id }, update, {
    new: true, 
  });

  return res.send(updatedPerson);
}

export async function getPersonHandler(
  req:Request,
//  req: Request<UpdatePersonInput["params"]>,
  res: Response
) {
   let person;
    if(req.query.name) {
  let personName = req.query.name;
  person = await findPersonByName({ personName });

  }
if(req.query.id) {
  const id=req.query.id;
   person = await findPersonById({id});
  //console.log('Person controller: ' + person);
}
if (!person) {
  return res.sendStatus(404);
}
return res.send(person);
}

export async function getPersonsHandler(
  req:Request,
//  req: Request<UpdatePersonInput["params"]>,
  res: Response
) {
  const persons = await findAllPersons({ });

  if (!persons) {
    return res.sendStatus(404);
  }

   var personMap = new Map();

  persons.forEach(person => {
     personMap.set(person.name, person.dateOfBirth);
  });
 var obj = Object.fromEntries(personMap);
 var jsonString = JSON.stringify(obj);

 return res.send(JSON.parse(jsonString));
  
}

export async function deletePersonHandler(
  req:Request,
//  req: Request<UpdatePersonInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const personId = req.params.personId;

  const person = await findPerson({ personId });

  if (!person) {
    return res.sendStatus(404);
  }

  if (String(person.user) !== userId) {
    return res.sendStatus(403);
  }

  await deletePerson({ personId });

  return res.sendStatus(200);
}
