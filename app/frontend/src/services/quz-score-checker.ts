import { formToJSON } from "axios"




export const checkScore = (e:React.FormEvent)=>{
   const solved_quiz: any = []
   e.preventDefault()
   const form = e.target as HTMLFormElement
   const formData = new FormData(form);
   const formObject: { [key: string]: any } = Object.fromEntries(formData.entries());
   const selected_options = Object.values((formObject))

    selected_options.forEach((option,i)=>{
      solved_quiz.push({
        'question_index':i+1,
        'selected_option':option
      })
    })

    console.log(solved_quiz)

}