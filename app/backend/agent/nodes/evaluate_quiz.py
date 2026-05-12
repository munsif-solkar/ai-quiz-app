import json
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage
from schemas.quiz_eval_schema import quiz_evaluation
from agent.state import State
from core.config import GROQ_API_KEY

llm = ChatGroq(model="llama-3.3-70b-versatile")

structured_llm = llm.with_structured_output(quiz_evaluation)

async def evaluate_quiz(state: State):
    print("--- EVALUATING QUIZ ---")
    topic = state["topic"]
    quiz = state['quiz_json']
    questions = quiz['questions']
    correct_answers = [q['correct_answer'] for q in questions]
    user_selected_options = [ans.selected_option for ans in state['quiz_answers']]
    # user_selected_options = state['quiz_answers']
    print("correct answers - user selected", correct_answers, user_selected_options)
    correct = []
    incorrect = []
    incorrect_questions = []
    # Compare user selected options with correct answers and categorize them into correct and incorrect
    for index,answer in enumerate(correct_answers):
        ind = index + 1
        if answer == user_selected_options[index]:
            correct.append(ind)
        else:
            incorrect.append(ind)
            incorrect_questions.append(questions[index]['question'])

    score = int((len(correct)/len(questions))*100)

    quiz_eval = {
        "topic": topic,
        "score": score,
        "incorrect_answers_index": incorrect,
        "correct_answers_index": correct,
        "improvement_tips": None
    }

    print("quiz evaluation data",quiz_eval)

    prompt = f"Provide imrovement tips for a user who scored {score}% on a quiz about {topic}. The user got the following questions wrong: {incorrect_questions}. Please give specific feedback on what the user did wrong and how they can improve, Keep the response brief, around 400-500 characters."

    try:
        response = await structured_llm.ainvoke([
            SystemMessage(content=json.dumps(quiz_eval)),
            HumanMessage(content=prompt)
        ],timeout=10)
        print(response)
        return {"quiz_evaluation":response.model_dump()}
    except Exception as e:

        return {"error":"Something went wrong, try again!"}