interface OptionItemProps {
  text: string
  isCorrect?: boolean
  index: number
}

export default function OptionItem({ text, isCorrect = false, index }: OptionItemProps) {
  return (
    <li>
      <label
        className={`p-2 rounded 
        flex flex-row gap-3
        ${isCorrect ? "bg-green-100 font-medium" : "bg-gray-50"}
        `}
      >

        <input type="radio" name={"question-" + index + 1} value={index} className="" />
        <p className="">{text}</p>


      </label>
    </li>

  )
}
