import type { Quiz } from "../..//types/quiz"
import QuizHeader from "./quiz-header"
import QuestionCard from "./question-card"
import { checkScore } from "../../services/quz-score-checker"
import type { QuizEvaluation } from "../..//types/quiz"
import { useState } from "react"
import QuizEvalutionBlock from "./quiz-evaluation-block"
import { motion, AnimatePresence } from "motion/react";

export default function QuizRenderer({ quiz }: { quiz: Quiz }) {
  const [results, setResults] = useState<QuizEvaluation | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formEvent: React.FormEvent) => {

    try {
      setLoading(true)
      const data = await checkScore(formEvent)
      setResults(data)
      console.log("weee", data)


    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="space-y-3">

      <AnimatePresence mode="wait">

        {results && <motion.div
          key="evaluation"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <QuizEvalutionBlock quizEval={results} />
        </motion.div>}

      </AnimatePresence>

      {loading && <motion.p
        key="loading"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        Evaluating your quiz...
      </motion.p>}

      <form name="quiz-solve" onSubmit={handleSubmit} data-quiz-id={quiz.quiz_id}>
        <QuizHeader quiz={quiz} solved={results ? true : false} />


        {quiz.questions.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 14,
              delay: i * 0.08,
            }}
          >
            <QuestionCard
              question={q}
              index={i}
              solved={results ? true : false}
              incorrect_answers={results?.incorrect_answers_index || []}
            />
          </motion.div>
        ))}
      </form>


    </div>
  )
}
