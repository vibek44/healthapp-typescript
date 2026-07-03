export interface BodyInfo {
  height: number;
  weight: number;
}

export function calculateBmi(height: number, weight: number): string {
  const bmi = weight / Math.pow(height * 0.01, 2);
  if (bmi <= 18) return "Underweight range";
  else if (bmi > 18 && bmi <= 24) return "Normal range";
  else if (bmi >= 25 && bmi <= 29) return "Overweight range";
  else return "Obesse range";
}
const parseArguments = (args: string[]): BodyInfo => {
  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      height: Number(args[0]),
      weight: Number(args[1]),
    };
  } else {
    throw new Error("provided value were not numbers");
  }
};

if (process.argv[1] === import.meta.filename) {
  try {
    if (process.argv.length < 4) throw new Error("not enough parameter");
    if (process.argv.length > 4) throw new Error("too many parameter");
    const { height, weight } = parseArguments(process.argv.slice(2));
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`something went wrong: ${error.message}`);
    }
  }
}
