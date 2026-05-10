import api from "./api";
import type { Query } from "../components/forms/querySchema";
import axios from "axios";

export const generateQuiz = async (query: Query) => {
  try {
    const res = await api.post("/generate-quiz", query);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      const message =
        (err.response?.data as any)?.detail ||
        "Something went wrong";

      if (status === 422) {
        throw new Error("Invalid input");
      }

      if (status === 400) {
        throw new Error(message);
      }

      if (status === 500) {
        throw new Error("Server failed to generate quiz");
      }

      throw new Error(message);
    }

    throw new Error("Unknown error");
  }
};