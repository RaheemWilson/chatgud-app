export interface Task {
  id: string;
  problem: string;
  category: any;
  proficiency: any;
  answer: Choice;
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
  choices: Choice[];
}

export interface Choice {
  id: string;
  name: string;
  type: string;
  transcription?: string;
  shortDescription?: string;
  longDescription?: string;
  media: string;
  sampleSentence?: string;
}
