export interface Question {
  question: string
  options: string[]
  correct_answer: number
  short_explanation: string
}

export interface Quiz {
  quiz_id: string
  topic: string
  intensity: string
  length: number
  questions: Question[]
}

export interface QuizAnswers{
    question_index: number
    selected_option: number
}


export interface SolvedQuiz{
  quiz_id: string
  quiz_answers: QuizAnswers[]
}

export interface QuizEvaluation {
  topic: string
  score: number
  incorrect_answers_index: number[]
  correct_answer_index: number[]
  improvement_tips: string
}
