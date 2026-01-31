import type { Quiz } from "../../types/quiz"

interface QuizHeaderProps {
  quiz: Quiz
}

export default function QuizHeader({ quiz }: QuizHeaderProps) {
  return (
    <div className="mb-6 space-y-2">
      <h2 className="text-2xl font-bold">{quiz.topic}</h2>
      <p className="text-sm text-gray-500 space-x-3">
        <span className="bg-yellow-600 rounded-md py-1 px-2 text-black">Questions: {quiz.length}</span>

        <span className="bg-[#628141] rounded-md py-1 px-2 text-white">{quiz.intensity.toUpperCase()}</span>
      </p>
    </div>
  )
}
