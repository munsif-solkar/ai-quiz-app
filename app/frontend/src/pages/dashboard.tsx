import TwoPanelLayout from "../components/layout/two-panel-layout"
import QuizForm from "../components/forms/quiz-form"
import { useState } from "react"
import { generateQuiz } from "../services/fetchQuiz"
import type { Query } from "../components/forms/querySchema"
import type { Quiz } from "../types/quiz"
import QuizRenderer from "../components/quiz/quiz-renderer"
import { Loading } from "../components/ui/Loading"
import { useNavigate } from "react-router-dom";
import useRelatedTopicsStore from "../store/relatedTopicsStore"
import useErrorStore from "../store/errorStore"


export default function Dashboard() {
 const navigate = useNavigate(); 
  const [results, setResults] = useState<Quiz | null>(null)
  const [recentQuery, setRecentQuery] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);

  const addRelatedTopics = useRelatedTopicsStore(state => state.setRelatedTopics)
  const setErrorState = useErrorStore(state => state.setError)

  const handleSubmit = async (query: Query ) => {
     
    const queryString = JSON.stringify(query).toLowerCase().trim()
    const recentQueryString = JSON.stringify(recentQuery).toLowerCase().trim()
   

    if (queryString != recentQueryString) {
      try {
        setErrorState(null)
        setLoading(true)
        setResults(null)
        const data = await generateQuiz(query)
        setResults(data)
        addRelatedTopics(data.related_topics)
        setRecentQuery(query)
        navigate(`/quiz/${data.quiz_id}`)

      } catch (err: any) {
        console.error(err)
        const message = err?.response?.data?.message || err?.message || "Something went wrong";
        setErrorState(message)

      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <TwoPanelLayout
      left={<QuizForm onSubmit={handleSubmit} />}
      right={
        <div className="bg-white p-6 rounded-3xl border-2 border-black h-[500px] overflow-y-scroll [&::] relative">
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

