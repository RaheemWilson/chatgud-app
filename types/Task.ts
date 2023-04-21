export interface Task {
  id: string;
  problem: string;
  category: any;
  proficiency: any;
  answer: Resource;
  answerId: string;
  categoryId: string;
  proficiencyId: string;
  options: string;
  type: string;
  taskOrder: number;
  taskChoice: TaskChoice;
}

export interface TaskChoice {
  id: string;
  choices: Resource[];
}

export interface Resource {
  id: string;
  name: string;
  type: string;
  transcription?: string;
  shortDescription?: string;
  longDescription?: string;
  media: string;
  sampleSentence?: string;
}

export type DailyChallenge = {
  id: string;
  problem: Task;
  dayOrder: number;
};

export type UserOverview = {
  score: number;
  completedQuiz: number;
  completedChallenges: number;
  completedCategories: number;
  quizScore: number;
  challengeScore: number;
  categoryScore: number;
};
