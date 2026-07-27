import { useEffect, useState } from "react";
import diaryService from "./diaryService";
import Diary from "./components/Diary";
import DiaryForm from "./components/DiaryForm";
import Notification from "./components/Notification";
import type { Diaries, NewDiary, ErrorType } from "./types";
import "./App.css";
import axios from "axios";

function App() {
  const [error, setErrorMessage] = useState<string | ErrorType[]>("");
  const [diaries, setDiaries] = useState<Diaries[]>([]);

  useEffect(() => {
    diaryService.getAll().then((res) => setDiaries(res.data));
  }, []);
  const handleSubmit = async (diary: NewDiary) => {
    console.log(diary);
    try {
      const data = await diaryService.create(diary);
      setDiaries(diaries.concat(data));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.error);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else {
        console.log(error);
      }
    }
  };
  if (diaries.length === 0) return <p>Loading...</p>;
  return (
    <div className="container">
      <Notification error={error} />
      <DiaryForm handleSubmit={handleSubmit} />
      <h3>Flight Diaries</h3>
      {diaries.map((diary) => (
        <Diary key={diary.id} diary={diary} />
      ))}
    </div>
  );
}

export default App;
