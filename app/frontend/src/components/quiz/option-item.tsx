interface OptionItemProps {
  text: string
  isCorrect?: boolean
  QuestionIndex: number,
  OptionIndex: number
}

export default function OptionItem({ text, isCorrect = false, QuestionIndex, OptionIndex }: OptionItemProps) {
  return (
    <li>
      <label
        className={`p-2 rounded 
        flex flex-row gap-3
        ${isCorrect ? "bg-green-100 font-medium" : "bg-gray-50"}
        `}
      >

        <input type="radio" name={"question-" + QuestionIndex + 1} value={OptionIndex + 1} className="" required/>
        <p className="">{text}</p>


      </label>
    </li>

  )
}
