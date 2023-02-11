import { Call } from "../../types/api/calls.types";
import {
  rand,
  randEmail,
  randFullName,
  randNumber,
  randPastDate,
  randPhoneNumber,
} from "@ngneat/falso";

export const generateCalls = (length: number): Array<Call> => {
  const dumpCalls: Array<Call> = [];

  for (let i = 0; i < length; i++) {
    dumpCalls.push({
      fullName: rand([randFullName({ locale: "RU" }), null]),
      phoneNumber: randPhoneNumber({ countryCode: "BY" }),
      universalNumber: randNumber({ length: 1 }).toString(),
      email: rand([randEmail(), null]),
      manager: randFullName({ locale: "RU" }),
      date: randPastDate().toISOString(),
      status: rand([0, 1, 2]),
      id: i,
    });
  }

  return dumpCalls;
};
