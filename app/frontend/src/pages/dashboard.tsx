import TwoPanelLayout from "../components/layout/two-panel-layout"
import QuizForm from "../components/forms/quiz-form"
import { useState } from "react"
import { generateQuiz } from "../services/fetchQuiz"
import type { Query } from "../components/forms/querySchema"
import type { Quiz } from "../types/quiz"
import QuizRenderer from "../components/quiz/quiz-renderer"

export default function Dashboard() {
  const [results, setResults] = useState<Quiz>()
  const [recentQuery, setRecentQuery] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (query: Query) => {
    const queryString = JSON.stringify(query).toLowerCase().trim()
    const recentQueryString = JSON.stringify(recentQuery).toLowerCase().trim()
    console.log(queryString,recentQueryString)
    if (queryString != recentQueryString) {
      try {
        setLoading(true)
        const data = await generateQuiz(query)
        setResults(data)
        setRecentQuery(query)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

  }

  return (
    <TwoPanelLayout
      left={<QuizForm onSubmit={handleSubmit} />}
      right={
        <div>
          {loading ? "Generating quiz..." : results ? <QuizRenderer quiz={results} /> : "No quiz yet"}
        </div>
      }
    />
  )
}
