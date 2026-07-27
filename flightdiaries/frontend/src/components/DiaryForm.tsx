import { useState } from "react";
import { type DiaryformProps, Visibility, Weather } from "../types";

const DiaryForm = ({ handleSubmit }: DiaryformProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comments, setComment] = useState("");
  const handleFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    handleSubmit({ date, visibility, weather, comments });
    setDate("");
    setVisibility("");
    setComment("");
  };
  return (
    <form
      onSubmit={handleFormSubmit}
      style={{ display: "flex", flexFlow: "column", width: "15em" }}
    >
      <div>
        <label htmlFor="date">date :</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="visibility">
        <label htmlFor="visibility">visibility:</label>
        {Object.values(Visibility).map((item) => (
          <div key={item} style={{ display: "flex", flexFlow: "row" }}>
            <label htmlFor={item}>{item}</label>
            <input
              type="radio"
              id={item}
              name="visibility"
              value={item}
              onChange={(e) => setVisibility(e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="weather">
        <label htmlFor="weather">weather:</label>
        {Object.values(Weather).map((item) => (
          <div key={item} style={{ display: "flex", flexFlow: "row" }}>
            <label htmlFor={item}>{item}</label>
            <input
              type="radio"
              id={item}
              name="weather"
              value={item}
              onChange={(e) => setWeather(e.target.value)}
            />
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="comment">comment :</label>
        <input
          type="text"
          value={comments}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button style={{ width: "5em" }} type="submit">
        Add
      </button>
    </form>
  );
};

export default DiaryForm;
