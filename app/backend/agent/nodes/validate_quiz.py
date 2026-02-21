from agent.state import State

def validate_quiz_node(state: State):
    quiz = state['quiz_json']
    if quiz and len(quiz.get('questions',[])) >= 5:
        state["quiz_json"]['quiz_id'] = state['quiz_id']
        return {"error":None}
    else:
        return {"error":"Unable to generate quiz"}
    


