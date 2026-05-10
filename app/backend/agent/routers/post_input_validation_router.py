from agent.state import State
from langgraph.graph import END

def post_input_validation_router(state: State):
    print("--- IN POST INPUT VALIDATION ROUTER ---")
    error = state['error']
    print(f"Input issues? {error}")
    if not error:
        return "generate"
    else:
        return END