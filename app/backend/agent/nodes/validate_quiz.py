from agent.state import State

def validate_quiz_node(state: State):
    quiz = state['quiz_json']
    if quiz and len(quiz.get('questions',[])) >= 10:
        return {"error":None}
    else:
        return {"error":"Unable to generate quiz"}
    


