import { useState } from "react"

interface OptionItemProps {
  text: string
  isCorrect?: boolean
  QuestionIndex: number,
  OptionIndex: number
  correct_option: number
}

export default function OptionItem({ text, isCorrect = false, QuestionIndex, OptionIndex ,correct_option}: OptionItemProps) {

  const option_index = OptionIndex + 1



  
  return (
    <li>
      <label
        className={`p-2 rounded 
        flex flex-row gap-3
        ${isCorrect ? "bg-green-100 font-medium" : "bg-gray-50"}
        `}
      >

        <input type="radio" name={"question-" + QuestionIndex } value={option_index} className="quiz-input" required/>
        <p className="">{text}</p>


      </label>
    </li>

  )
}
