import type { QuizEvaluation } from "../../types/quiz";


export default function QuizEvalutionBlock({ quizEval }: { quizEval: QuizEvaluation }) {
    return (
        <>
            <div className="bg-[#F5F5F5] px-3 py-3 rounded-lg flex flex-col gap-2  top-0 left-0 w-full shadow-md">
                <div className="evaluation-header">
                    <p className="font-semibold space-x-2">
                        <span className="bg-[#3B7597] py-1 px-3 text-white rounded-full">Quiz Results</span>
                        <span>{quizEval.topic}</span>
                    </p>
                </div>
                <p className="font-bold text-2xl text-black">Score: {quizEval.score}%</p>
                <div className="flex flex-row">
                    <p className="font-semibold bg-[#5C766D] text-white py-0.5 px-2 w-max rounded-l-lg">Correct: {quizEval.correct_answers_index.length}</p>
                    <p className="font-semibold bg-[#C44545] text-white py-0.5 px-2 w-max rounded-r-lg">Incorrect: {quizEval.incorrect_answers_index.length}</p>
                </div>
                <div className="space-y-2">
                    <p className="font-semibold text-[#3B7597] px-1">Summary</p>
                   <p className="bg-white p-2 rounded-lg">{quizEval.improvement_tips}</p> 
                </div>

                <div className="space-y-2">
                    <p className="font-semibold text-[#3B7597] px-1">Resources for improvement</p>
                    <ul className=" space-y-1">
                        {quizEval.links.map((link, i) => (
                            <li key={i} className="bg-white py-1 px-3 rounded-lg">
                                <a href={link} target="_blank" rel="noopener noreferrer" className="text-gray-600 font-semibold  rounded-full text-sm hover:text-blue-500 cursor-pointer">
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

        </>
    )
}