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
import { motion, AnimatePresence } from "motion/react";

export default function Dashboard() {
 const navigate = useNavigate(); 
  const [results, setResults] = useState<Quiz | null>(null)
  const [recentQuery, setRecentQuery] = useState({})
  const [loading, setLoading] = useState(false)

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
      <div className="bg-white p-6 rounded-3xl border-0 lg:border-2 border-black h-[500px] overflow-y-scroll ">

        <AnimatePresence mode="wait">

          {loading ? (

            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Loading text="Generating your quiz..." />
            </motion.div>

          ) : results ? (

            <motion.div
              key="results"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 14,
              }}
            >
              <QuizRenderer quiz={results} />
            </motion.div>

          ) : (

            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <QuizIntro />
            </motion.div>

          )}

        </AnimatePresence>

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

