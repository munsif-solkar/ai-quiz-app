interface OptionItemProps {
  text: string
  isCorrect?: boolean
}

export default function OptionItem({ text, isCorrect = false }: OptionItemProps) {
  return (
    <li
      className={`p-2 rounded ${
        isCorrect ? "bg-green-100 font-medium" : "bg-gray-50"
      }`}
    >
      {text}
    </li>
  )
}
