import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";
import { isNotNumber } from "./utils.ts";

const app = express();
app.use(express.json());
const PORT = 3003;

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (!weight || !height) {
    res.json({ error: "malformatted parameter" });
    return;
  }

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    res.json({
      height: height,
      weight: weight,
      bmi: calculateBmi(Number(height), Number(weight)),
    });
  }
  if (isNaN(Number(height)) || isNaN(Number(weight)))
    res.json({ error: "malformatted parameter" });
});

app.post("/exercises", (req, res) => {
  try {
    //console.log(req.body);
    const { hours, target }: { hours: string[]; target: number } = req.body;
    console.log(typeof target);
    if (isNotNumber(target)) {
      res.json({ error: "parameter is not number" });
      return;
    }
    const parsedHours = hours.map((ele) => {
      if (isNotNumber(ele)) throw new Error("parameter is not number");
      return Number(ele);
    });
    const result = calculateExercises(parsedHours, Number(target));
    res.json({ result });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.json({ error: error.message });
    }
  }
});

app.listen(PORT, () => console.log(`server on port: ${PORT}`));
