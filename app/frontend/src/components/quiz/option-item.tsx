import { useState } from "react"

interface OptionItemProps {
  text: string
  QuestionIndex: number,
  OptionIndex: number,
  correct_option: number,
  solved:boolean
}

export default function OptionItem({ text, QuestionIndex, OptionIndex ,correct_option,solved}: OptionItemProps) {

  const option_index = OptionIndex + 1

  const isCorrect = option_index == correct_option;

  
  return (
    <li>
      <label
        className={`p-2 rounded 
        flex flex-row gap-3
        ${isCorrect && solved ? "bg-green-100 font-medium" : "bg-gray-50"}
        `}
      >

        <input type="radio" name={"question-" + QuestionIndex } value={option_index} className="quiz-input" required/>
        <p className="">{text}</p>


      </label>
    </li>

  )
}
