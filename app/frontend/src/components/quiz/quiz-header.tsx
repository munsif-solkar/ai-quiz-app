import type { Quiz } from "../../types/quiz"
import { Button } from "../ui/button"

interface QuizHeaderProps {
  quiz: Quiz
}

const intensityColors: Record<Quiz["intensity"], string> = {
  easy: "bg-[#628141]",
  medium: "bg-[#DE802B]",
  hard: "bg-[#AA2B1D]",
}

export default function QuizHeader({ quiz }: QuizHeaderProps) {
  return (
    <div className="mb-6 items-center flex justify-between flex-row">
      <div className="space-y-2">
      <h2 className="text-2xl font-bold">{quiz.topic}</h2>
      <p className="text-sm text-gray-500 space-x-3">
        <span className="bg-[#435663] rounded-md py-1 px-2 text-white">Questions: {quiz.length}</span>

        <span className={`${intensityColors[quiz.intensity]} rounded-md py-1 px-2 text-white`}>{quiz.intensity.toUpperCase()}</span>
      </p>
      </div>
      <Button
        type="submit"
        className=" bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition w-max h-max"
      >
        Check Score
      </Button>
    </div>
  )
}
