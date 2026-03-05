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
        {index + 1}. {question.question} - {question.correct_answer}
      </p>

        {solved && (solved_incorrect ? 'incorrect' : 'correct')}


      <ul className="mt-2 space-y-1">


        {question.options.map((opt, i) => (
          

          
    <OptionItem key={i} text={opt} QuestionIndex={question_index} OptionIndex={i} isCorrect={false} correct_option={question.correct_answer}></OptionItem>
       
          
        ))}
      </ul>
        
      {solved && <p className="mt-2 text-sm text-gray-600 }">
        {question.short_explanation}
      </p>}
    </div>
  )
}
