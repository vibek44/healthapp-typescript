import { isNotNumber } from "./utils.ts";
interface HourInfo {
  target: number;
  hours: number[];
}
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function averageHour(hours: number[]): number {
  return (
    hours.reduce((acc, currentValue) => acc + currentValue, 0) / hours.length
  );
}
export function calculateExercises(hours: number[], target: number): Result {
  const average = averageHour(hours);
  return {
    periodLength: hours.length,
    trainingDays: hours.filter((hour) => hour !== 0).length,
    success: average >= target,
    rating: average <= 1 ? 1 : average > 1 && average < 2 ? 2 : 3,
    ratingDescription:
      average <= 1
        ? "can be much better"
        : average > 1 && average < 2
        ? "Not too bad but could be better"
        : "great Keep it up",
    target,
    average,
  };
}

const parseHourArguments = (args: string[]): HourInfo => {
  if (args.length < 3) throw new Error("not enough parameter");
  const parsedHour = args.map((ele) => {
    if (isNotNumber(ele)) throw new Error("parameter is not number");
    return Number(ele);
  });
  return {
    target: parsedHour[0],
    hours: parsedHour.slice(1),
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, hours } = parseHourArguments(process.argv.slice(2));
    console.log(calculateExercises(hours, target));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`error occured : ${error.message}`);
    }
  }
}
