
import type { NewPatientEntry,} from "./types.ts";
import {NewEntrySchema } from "./types.ts";

/*
const isString = (str: unknown): str is string => {
  return typeof str === "string";
};

const isDate = (date:string):boolean => {
   return Boolean(Date.parse(date))
}

const isGender = (gender:string):gender is Gender => {
  return (Object.values(GenderObject) as string[]).includes(gender)
}
const parseGender = (gender:unknown):Gender => {
  if(!isString (gender)|| !isGender(gender)){
    throw new Error("Incorrect or missing gender content "+gender);
  }
  return gender
}

const parseDate=(str:unknown):string=>{
  if(!isString(str) || !isDate(str)){
    throw new Error("Incorrect or missing date content");
  }
  return str
}
const parseEntry = (str: unknown): string => {
  if (!isString(str)) {
    throw new Error("Incorrect or missing content");
  }
  return str;
};
*/
export const parsePatientEntry = (entry: unknown): NewPatientEntry => {
    return NewEntrySchema.parse(entry);
 
};
