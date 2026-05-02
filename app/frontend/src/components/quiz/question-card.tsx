import type { Question } from "../../types/quiz"
import OptionItem from "./option-item"


interface QuestionCardProps {
  question: Question
  index: number
  solved:boolean
  incorrect_answers: number[]
}

export default function QuestionCard({ question, index,solved=false,incorrect_answers=[] }: QuestionCardProps) {

  const question_index = index + 1
  const solved_incorrect = solved && incorrect_answers.includes(question_index)


  return (
    <div className={`p-3 border rounded-lg shadow-sm mb-4 question ${solved_incorrect ? 'border-red-600' : 'border-green-700'}`} data-correct-option={question.correct_answer}>
      <p className="font-semibold">
        {index + 1}. {question.question}
      </p>

        {solved && (solved_incorrect ? 
          
          <span className="bg-[#C44545] px-2 py-0.5 rounded-full text-white text-sm">incorrect</span> 
          : 
          <span className="bg-[#5C766D] px-2 py-0.5 rounded-full text-white text-sm">correct</span>)}


      <ul className="mt-2 space-y-1">


        {question.options.map((opt, i) => (
          

          
    <OptionItem key={i} text={opt} QuestionIndex={question_index} OptionIndex={i} solved={solved} correct_option={question.correct_answer}></OptionItem>
       
          
        ))}
      </ul>
        
      {solved && <p className="mt-2 text-sm text-gray-600 }">
        {question.short_explanation}
      </p>}
    </div>
  )
}
