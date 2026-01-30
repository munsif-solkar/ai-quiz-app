import type { Quiz } from "../../types/quiz"

interface QuizHeaderProps {
  quiz: Quiz
}

export default function QuizHeader({ quiz }: QuizHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold">{quiz.topic}</h2>
      <p className="text-sm text-gray-500">
        Intensity: {quiz.intensity} | Questions: {quiz.length}
      </p>
    </div>
  )
}
