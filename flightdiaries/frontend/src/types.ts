export const Weather = {
  Sunny: "sunny",
  Rainy: "rainy",
  Cloudy: "cloudy",
  Stormy: "stormy",
  Windy: "windy",
} as const;

//export type Weather = (typeof Weather)[keyof typeof Weather];

export const Visibility = {
  Great: "great",
  Good: "good",
  Ok: "ok",
  Poor: "poor",
} as const;

//export type Visibility = (typeof Visibility)[keyof typeof Visibility];

export interface Diaries {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comments?: string;
}

export type NewDiary = Omit<Diaries, "id">;

export interface DiaryformProps {
  handleSubmit: (diary: NewDiary) => void;
}

export interface ErrorType {
  path: string[];
  code: string;
}
