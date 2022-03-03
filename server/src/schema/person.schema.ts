import { object, string, TypeOf } from "zod";

const payload = {
  body: object({
      name: string({
      required_error: "Name is required",
        }),
      title: string({
        required_error: "Tilte is required",
      }),
      categories: string({
        required_error: "Categories is required",
      }),
      dateOfBirth: string({
        required_error: "Date/year of birth is required",
      }),
      dateOfDeath: string({
        required_error: "Date/year of death is required",
      }),
      description: string({
        required_error: "Description is required",
      }),
      nationality : string(),
      related : string(),
      comments : string(),
      tag: string(),
      dobera: string({
        required_error: "DOB Era (CE/BCE) is required",
      }),
      dodera: string({
        required_error: "DOD Era (CE/BCE) is required",
      }),
  
    }),
};

// const params = {
//     params: object({
//       personId: string({
//       //  required_error : "personId is required",
//     }),
//     name: string({
//       // required_error : "personId is required",
//    }),
//    id: string({
//     // required_error : "personId is required",
//  }),
// }),
//   };
  
  export const createPersonSchema = object({
    ...payload,
  });
  
  export const updatePersonSchema = object({
   // ...params,
    ...payload,
  });
  
  export const deletePersonSchema = object({
   // ...params,
  });
  

export const getPersonSchema = object({
 // ...params,
});

export type CreatePersonInput = TypeOf<typeof createPersonSchema>;
export type UpdatePersonInput = TypeOf<typeof updatePersonSchema>;
export type ReadPersonInput = TypeOf<typeof getPersonSchema>;
export type DeletePersonInput = TypeOf<typeof deletePersonSchema>;


