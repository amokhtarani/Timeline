import { Request, Response } from "express";
import {
    findAllEvents,
  } from "../service/event.service";
  import {
    findAllPersons,
  } from "../service/person.service";
  import PersonModel from "../models/person.model";
  import EventModel from "../models/event.model";
import { string } from "zod";

class Item {
    title:string
    year : string;
    id :string;
    type : string;
    constructor(title:string, year:string, id: string, type: string) {
        this.title = title;
        this.year = year;
        this.id = id;
        this.type = type;
    }
}

//these two fuctions create an entity (Item)  with reduced 
//attributes to display the timeline
function reduceEvent(e : any) {
    return new Item(e.eventTitle, e.dateOfEvent,
        e._id, "event");
}

function reducePerson(p : any) {
   // console.log(p);
    return new Item(p.name, p.dateOfBirth,
        p._id, "person");
} 

export async function timelineHandler (
    req: Request,
    res: Response
  ) {
//console.log("In timeline Handler");
    const startDate = req.query.startDate;
    const stopDate = req.query.stopDate;
    if(startDate) console.log("Start Date: " + startDate);
   if(startDate) console.log("Stop Date: " + stopDate);
//get all events
     const events = await findAllEvents({  });
  
    if (!events) {
      return res.sendStatus(404);
    }

 
 
    // const timelineMap = new Map();
    // events.forEach(event => {
    //     timelineMap.set(event.eventTitle, event.dateOfEvent);
    // });

//get all persons
    const persons = await findAllPersons({ });

    //this is temporary  *************
    const person = await PersonModel.findOne({'name' : 'Adam Smith'});
    //console.log(person);
     const event = await EventModel.findOne({'dateOfEvent' : "1938"});
    //console.log(event);

    //get list of persons with name Adam Smith
 //   const query = PersonModel.find({'name' : 'Adam Smith'});
    const query = PersonModel.find({'datOfBirth' : '1876'});
  //query.exec(function(err, person) {console.log(person)});
     // /// end  *************

    if (!persons) {
      return res.sendStatus(404);
    }
   
    let resArray = new Array();
    events.forEach(event => {
        resArray.push(reduceEvent(event))
    });

    persons.forEach(person => {
       // console.log(person);
        resArray.push(reducePerson(person));

    });

//     persons.forEach(person => {
//         timelineMap.set(person.name, person.dateOfBirth);
//     });
//    var obj = Object.fromEntries(timelineMap);
//    var jsonString = JSON.stringify(obj);
 //return res.send(JSON.parse(jsonString));
 
   //console.log( resArray);

    return res.send(resArray);

  }