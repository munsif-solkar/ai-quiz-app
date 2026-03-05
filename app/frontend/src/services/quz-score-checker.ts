import { evaluation } from "./evaluateQuiz"


export const checkScore = async (e: React.FormEvent) => {
  e.preventDefault()

  const solved_quiz_options: any[] = []

  const quiz_id = e.currentTarget.getAttribute('data-quiz-id')
  if (!quiz_id) throw new Error("Quiz ID not found")

  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  const formObject = Object.fromEntries(formData.entries())
  const selected_options = Object.values(formObject)

  selected_options.forEach((option, i) => {
    solved_quiz_options.push({
      question_index: i + 1,
      selected_option: option
    })
  })

  const results = await evaluation({
    quiz_id,
    quiz_answers: solved_quiz_options
  })
  console.log(results)

  return results
}