import type { QuizEvaluation } from "../../types/quiz";


export default function QuizEvalutionBlock({quizEval}: {quizEval: QuizEvaluation}){
    return (
        <>
            <h1>{quizEval.topic}</h1>
        </>
    )
}