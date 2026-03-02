import type { Quiz } from "../..//types/quiz"
import QuizHeader from "./quiz-header"
import QuestionCard from "./question-card"
import { checkScore } from "../../services/quz-score-checker"


export default function QuizRenderer({ quiz }: { quiz: Quiz }) {

 

  return (
    <div className="space-y-6">
      <form name="quiz-solve" onSubmit={checkScore} data-quiz-id={quiz.quiz_id}>
      <QuizHeader quiz={quiz} />
      
      {quiz.questions.map((q, i) => (
        <QuestionCard key={i} question={q} index={i} />
      ))}
      </form>
    </div>
  )
}
