import { ImageSourcePropType } from "react-native";

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  categoryOrder: number;
  beginnerCount: number;
  intermediateCount: number;
};


export type CompletedCategory = {
    id: string;
    userId: string;
    categoryId: string;
    score: number;
    completed: number;
    dateStarted: Date;
    dateCompleted: Date;
    category: Category
}
