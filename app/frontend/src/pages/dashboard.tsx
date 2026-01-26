import TwoPanelLayout from "../components/layout/two-panel-layout"
import QuizForm from "../components/forms/quiz-form"

import { useState } from "react"

export default function Dashboard() {
  const [results, setResults] = useState("")

  return (
    <TwoPanelLayout
      left={<QuizForm onSubmit={() => setResults("Results updated!")} />}
      right={<div>{results}</div>}
    />
  )
}
