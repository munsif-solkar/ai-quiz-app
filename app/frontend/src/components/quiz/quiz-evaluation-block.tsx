import type { QuizEvaluation } from "../../types/quiz";


export default function QuizEvalutionBlock({quizEval}: {quizEval: QuizEvaluation}){
    return (
        <>
           
            {quizEval.improvement_tips}
           <p>Score: {quizEval.score}%</p>
        </>
    )
}