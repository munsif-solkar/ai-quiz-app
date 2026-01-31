import type { Question } from "../../types/quiz"
import OptionItem from "./option-item"


interface QuestionCardProps {
  question: Question
  index: number
}

export default function QuestionCard({ question, index }: QuestionCardProps) {
  return (
    <div className="p-3 border rounded-lg shadow-sm mb-4">
      <p className="font-semibold">
        {index + 1}. {question.question}
      </p>

      <ul className="mt-2 space-y-1">

        

        {question.options.map((opt, i) => (
          

          
    <OptionItem key={i} text={opt} index={index}></OptionItem>
       
          
        ))}
      </ul>

      <p className="mt-2 text-sm text-gray-600 hidden">
        {question.short_explanation}
      </p>
    </div>
  )
}
