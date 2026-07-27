import type { Diaries } from "../types";
interface DiaryProps {
  diary: Diaries;
}

const Diary = ({ diary }: DiaryProps) => {
  return (
    <div style={{ marginTop: "2em" }}>
      <b>{diary.date}</b>
      <p>
        weather: <b>{diary.weather}</b>
      </p>
      <p>
        visibility: <b>{diary.visibility}</b>
      </p>
    </div>
  );
};

export default Diary;
