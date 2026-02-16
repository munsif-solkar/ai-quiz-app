import TwoPanelLayout from "../components/layout/two-panel-layout"
import QuizForm from "../components/forms/quiz-form"
import { useState } from "react"
import { generateQuiz } from "../services/fetchQuiz"
import type { Query } from "../components/forms/querySchema"
import type { Quiz } from "../types/quiz"
import QuizRenderer from "../components/quiz/quiz-renderer"
import { Loading } from "../components/ui/Loading"



export default function Dashboard() {
  const [results, setResults] = useState<Quiz | null>(null)
  const [recentQuery, setRecentQuery] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (query: Query) => {
    const queryString = JSON.stringify(query).toLowerCase().trim()
    const recentQueryString = JSON.stringify(recentQuery).toLowerCase().trim()

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
        <div className="bg-white p-6 rounded-3xl border-2 border-black h-[500px] overflow-y-scroll scroll-m-10">
          {loading ? <Loading text='Generating your quiz...'/> : results && <QuizRenderer quiz={results} />}
          { !results && !loading && <QuizIntro/> }
        </div>
      }
    />
  )
}

function QuizIntro(){
  return (
  <>
    <div className="flex items-center justify-center">
<h1 className="font-bold uppercase leading-normal text-3xl text-gray-500">Generate quiz over any topic to test your skills</h1>
    </div>
  </>
  )
}

