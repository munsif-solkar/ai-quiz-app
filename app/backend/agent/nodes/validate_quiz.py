from agent.state import State

def validate_quiz_node(state: State):
    quiz = state.get("quiz_json", {})
    questions = quiz.get("questions", [])

    expected_length = int(state.get("length", 0))

    actual_length = len(questions)

    # invalid case
    if not quiz or actual_length < 5:
        return {"error": "Unable to generate quiz"}

    # FIX: enforce exact length
    if expected_length and actual_length != expected_length:
        print(f"[WARN] Fixing quiz length: {actual_length} → {expected_length}")

        # trim if extra
        if actual_length > expected_length:
            quiz["questions"] = questions[:expected_length]

        # if less, fail (or you can trigger regenerate)
        elif actual_length < expected_length:
            return {"error": f"Quiz incomplete: expected {expected_length}, got {actual_length}"}

    # attach quiz_id
    quiz["quiz_id"] = state.get("quiz_id")

    return {
        "quiz_json": quiz,
        "error": None
    }
    


