import express from "express";

const app = express();
const PORT = 3000;
console.log(process);
app.listen(PORT, () => {
  console.log(`app running in port ${PORT}`);
});
