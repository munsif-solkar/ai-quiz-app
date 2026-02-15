import { formToJSON } from "axios"


export const correct_options: number[] = []

export const checkScore = (e:React.FormEvent)=>{
   e.preventDefault()
   const form = e.target as HTMLFormElement
   const formData = new FormData(form);
   const formObject: { [key: string]: any } = Object.fromEntries(formData.entries());
   const selected_options = Object.values((formObject))

 console.log(correct_options,selected_options)

}