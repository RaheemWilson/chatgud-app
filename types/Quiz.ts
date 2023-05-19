import { Category } from "./Category"
import { Proficiency } from "./Proficiency"
import { Resource, Task } from "./Task"


export type QuizQuestion = {
    id: string
    task: Task
    quizId: string
    taskId: string
    questionOrder: number
    questionResource: Resource
    questionResourceId: string
}

export type Quiz = {
    id: string
    category: Category
    categoryId: string
    proficiency: Proficiency
    proficiencyId: string
    quizQuestion: QuizQuestion[]
}

export type CompletedQuiz = {
    id: string;
    userId: string;
    categoryId: string;
    score: number;
    dateStarted: Date;
    dateCompleted: Date;
    quiz: any
}
