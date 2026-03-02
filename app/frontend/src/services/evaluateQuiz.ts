import api from "./api";
import type { SolvedQuiz } from "../types/quiz";

export const evaluation = async (solved_quiz: SolvedQuiz) => {
    const res = await api.post('/evaluate-quiz',solved_quiz)
    return res.data
}