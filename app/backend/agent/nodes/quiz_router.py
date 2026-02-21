from agent.state import State

def quiz_router(state: State):
    quiz_solved = state['quiz_solved']
    if quiz_solved:
        return "evaluate"
    else:
        return "generate"