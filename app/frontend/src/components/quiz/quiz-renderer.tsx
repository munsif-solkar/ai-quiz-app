import type { Quiz } from "../..//types/quiz"
import QuizHeader from "./quiz-header"
import QuestionCard from "./question-card"
import { checkScore } from "../../services/quz-score-checker"
import type { QuizEvaluation } from "../..//types/quiz"
import { useState } from "react"
import QuizEvalutionBlock from "./quiz-evaluation-block"


export default function QuizRenderer({ quiz }: { quiz: Quiz }) {
  const [results, setResults] = useState<QuizEvaluation | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formEvent: React.FormEvent) => {
     
      try {
        setLoading(true)
        const data = await checkScore(formEvent)
        setResults(data)
        console.log("weee",data)

      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
  }
 

  return (
    <div className="space-y-6">
      {results && <QuizEvalutionBlock quizEval={results}/>}

      <form name="quiz-solve" onSubmit={handleSubmit} data-quiz-id={quiz.quiz_id}>
      <QuizHeader quiz={quiz} />
      
      {quiz.questions.map((q, i) => (
        <QuestionCard key={i} question={q} index={i} solved={results ? true : false} incorrect_answers={results?.incorrect_answers_index || []}/>
      ))}
      </form>
      

    </div>
  )
}
