export interface Question {
  question: string
  options: string[]
  correct_answer: number
  short_explanation: string
}

export interface Quiz {
  topic: string
  intensity: string
  length: number
  questions: Question[]
}
