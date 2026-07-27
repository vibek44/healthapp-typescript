import axios from "axios";
import type { Diaries, NewDiary } from "./types";
const url = `http://localhost:3000/api/diaries`;

const getAll = async () => {
  const data = await axios.get<Diaries[]>(url);
  return data;
};

const create = async (diary: NewDiary) => {
  const data = await axios.post<Diaries>(url, diary).then((res) => res.data);
  return data;
};

export default { getAll, create };
