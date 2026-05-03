import api from "./api";
import type { Query } from "../components/forms/querySchema";
import axios from "axios";

export const generateQuiz = async (query: Query) => {
    try{
     const res = await api.post('/generate-quiz',query)
    return res.data 
    } catch(err){
        if (axios.isAxiosError(err)){
            const status = err.response?.status;
            console.log(status)
            if (status === 422){
                throw new Error("Invalid input")
            }
        }
    }
   
}