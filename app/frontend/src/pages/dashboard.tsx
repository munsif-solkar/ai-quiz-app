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
import { Sparkles, BrainCircuit, Zap } from "lucide-react";

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
      <div className="bg-white p-6 rounded-3xl border-0 lg:border-2 border-black h-[550px] overflow-y-scroll ">

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

function QuizIntro() {
  return (
    <div className="rounded-3xl  bg-white p-5 ">
      <div className="flex flex-col gap-8">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight text-zinc-900">
            Create interactive quizzes on any topic in seconds.
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-2xl text-lg leading-relaxed text-zinc-500"
        >
          Generate AI-powered quizzes with customizable difficulty,
          instant scoring, and smart feedback — all in a clean and
          seamless experience.
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid gap-4 sm:grid-cols-3"
        >
          <div className="rounded-2xl border border-zinc-200 p-5">
            <BrainCircuit size={20} className="text-zinc-700" />
            <h3 className="mt-3 font-semibold text-zinc-900">
              AI Generated
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Dynamic questions generated instantly from your topic.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 p-5">
            <Zap size={20} className="text-zinc-700" />
            <h3 className="mt-3 font-semibold text-zinc-900">
              Instant Results
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Get scores and detailed feedback immediately.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 p-5">
            <Sparkles size={20} className="text-zinc-700" />
            <h3 className="mt-3 font-semibold text-zinc-900">
              Fully Customizable
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Adjust quiz difficulty and question count easily.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-zinc-400"
        >
          Fill the form and generate your first quiz.
        </motion.p>
      </div>
    </div>
  );
}