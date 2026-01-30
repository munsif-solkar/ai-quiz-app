import type { Quiz } from "../..//types/quiz"
import QuizHeader from "./quiz-header"
import QuestionCard from "./question-card"

export default function QuizRenderer({ quiz }: { quiz: Quiz }) {
  return (
    <div className="space-y-6">
      <QuizHeader quiz={quiz} />
      {quiz.questions.map((q, i) => (
        <QuestionCard key={i} question={q} index={i} />
      ))}
    </div>
  )
}
