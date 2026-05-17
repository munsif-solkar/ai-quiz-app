import api from "./api";
import type { SolvedQuiz } from "../types/quiz";
import axios from "axios";

export const evaluation = async (solved_quiz: SolvedQuiz) => {
    try {

        const res = await api.post('/evaluate-quiz', solved_quiz)
        return res.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const status = err.response?.status;
            const message =
                (err.response?.data as any)?.detail ||
                "Something went wrong";

            if (status === 400) {
                throw new Error(message);
            }

            if (status === 500) {
                throw new Error("Server failed to evaluate quiz");
            }

            throw new Error(message);
        }

        throw new Error("Unknown error");
    }
}