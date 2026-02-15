import { useState } from "react"

interface OptionItemProps {
  text: string
  isCorrect?: boolean
  QuestionIndex: number,
  OptionIndex: number
}

export default function OptionItem({ text, isCorrect = false, QuestionIndex, OptionIndex }: OptionItemProps) {
  const question_index = QuestionIndex + 1
  const option_index = OptionIndex + 1


  const [selectedOptions,setSelectedOption] = useState<any>([])
  
  return (
    <li>
      <label
        className={`p-2 rounded 
        flex flex-row gap-3
        ${isCorrect ? "bg-green-100 font-medium" : "bg-gray-50"}
        `}
      >

        <input type="radio" name={"question-" + question_index } value={option_index} className="quiz-input" required onChange={(e)=>{selectedOptions[QuestionIndex] = e.target.value}}/>
        <p className="">{text}</p>


      </label>
    </li>

  )
}
