import api from "./api";
import type { Query } from "../components/forms/querySchema";

export const generateQuiz = async (query: Query) => {
    const res = await api.post('/generate-quiz',query)
    return res.data
}