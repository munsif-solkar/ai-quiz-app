# AI Quiz App

This is a full-stack application that leverages Large Language Models (LLMs) to dynamically generate and evaluate quizzes on any topic provided by the user.

The frontend is built with React, TypeScript, and Vite, offering a clean and interactive user experience. The backend is a Python application using FastAPI, with a LangGraph agent orchestrating calls to the Groq API for fast LLM inference.

## Features

-   **Dynamic Quiz Generation**: Create quizzes on any subject by simply providing a topic.
-   **Customizable Difficulty**: Tailor quizzes by selecting the intensity level (Easy, Medium, or Hard).
-   **Variable Length**: Specify the number of questions for each quiz (from 5 to 20).
-   **Instant Scoring**: Submit your answers and receive your score immediately.
-   **AI-Powered Evaluation**: Get detailed feedback, including a breakdown of correct/incorrect answers and AI-generated tips for improvement.
-   **Interactive UI**: A modern and responsive interface for a seamless quiz-taking experience.

## Technology Stack

-   **Backend**:
    -   **Framework**: FastAPI
    -   **AI Orchestration**: LangChain & LangGraph
    -   **LLM Provider**: Groq API
    -   **Models**: Llama 3.1 8B, Llama 3.3 70B
    -   **Data Validation**: Pydantic
-   **Frontend**:
    -   **Library/Framework**: React
    -   **Language**: TypeScript
    -   **Build Tool**: Vite
    -   **Styling**: Tailwind CSS
    -   **API Communication**: Axios

## System Architecture

The application is composed of a distinct frontend and backend that communicate via a REST API.

### Backend

The backend is built with **FastAPI**. The core logic is encapsulated within a **LangGraph** agent, which defines a stateful graph to manage the quiz lifecycle.

1.  **State Management**: The agent's `State` includes the quiz topic, intensity, generated questions, user answers, and evaluation results. LangGraph's `MemorySaver` is used to persist the state of each quiz session, identified by a unique `quiz_id`.

2.  **Control Flow**: A `quiz_router` at the entry point of the graph directs the flow. If a quiz has not been solved, it proceeds to the `generate` branch. If it has been solved (indicated by the presence of `quiz_answers`), it proceeds to the `evaluate` branch.

3.  **Quiz Generation**:
    -   The `gen_quiz_node` uses the `llama-3.3-70b-versatile` model via the Groq API to create a list of questions, options, and explanations based on the user's topic.
    -   The `validate_quiz_node` checks if the generated quiz meets the minimum length requirement before sending it to the user.

4.  **Quiz Evaluation**:
    -   When a user submits their answers, the `EvaluateQuizAgent` is invoked.
    -   The `evaluate_quiz` node uses the `llama-3.1-8b-instant` model to compare the user's answers against the correct answers stored in the session's state.
    -   It calculates the score, identifies correct and incorrect answers, and generates personalized improvement tips.

### Frontend

The frontend is a single-page application created with **React** and **Vite**.

-   **Components**: The UI is broken down into reusable components for the quiz form, question cards, results display, and layout.
-   **Services**: API calls to the backend are handled by dedicated service functions using **Axios**.
-   **Routing**: **React Router** is used to manage navigation, creating a unique URL path (`/quiz/:quiz_id`) for each generated quiz.
-   **Styling**: **Tailwind CSS** provides a utility-first approach for responsive design.

---

## Docker Setup (Recommended)

You can run the entire project using Docker without manually installing Python or Node.

### Prerequisites

* Docker installed → [https://www.docker.com/](https://www.docker.com/)

---

### 1. Environment Setup

Create a `.env` file in (app/) dir:

```env
GROQ_API_KEY=your_groq_api_key_here
```

You can copy from the example:

```bash
cp .env.example .env
```

---

### 2. Build and Run with Docker Compose

From the root directory:

```bash
docker compose up --build
```

This will:

* Start the backend (FastAPI)
* Start the frontend (React)
* Connect both services automatically

---

### 3. Access the App

* Frontend → [http://localhost:5173](http://localhost:5173)

---

### 4. Stop Containers

```bash
docker compose down
```

---


## Local Setup and Installation

Follow these steps to run the project on your local machine.

### Prerequisites

-   Python 3.9+
-   Node.js v20.19+ and npm

### Backend Setup

1.  **Navigate to the backend directory:**
    ```sh
    cd app/backend
    ```

2.  **Create and activate a virtual environment:**
    ```sh
    # For Unix/macOS
    python -m venv venv
    source venv/bin/activate

    # For Windows
    python -m venv venv
    .\venv\Scripts\activate
    ```

3.  **Install dependencies:**
    ```sh
    pip install fastapi uvicorn python-dotenv langgraph langchain-groq pydantic-settings pyjwt
    ```

4.  **Configure environment variables:**
    Create a `.env` file in the `app/backend` directory and add your Groq API key:
    ```env
    GROK_API_KEY="YOUR_GROQ_API_KEY"
    ```

5.  **Run the backend server:**
    ```sh
    uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
    ```
    The server will be available at `http://127.0.0.1:8000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```sh
    cd app/frontend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the frontend development server:**
    ```sh
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173`.

## API Endpoints

The backend exposes the following API endpoints:

-   `POST /generate-quiz`
    -   Generates a new quiz.
    -   **Body**: `{ "topic": "string", "intensity": "string", "length": "integer" }`
    -   **Response**: A JSON object containing the quiz details and questions.

-   `POST /evaluate-quiz`
    -   Evaluates a user's submitted answers for a quiz.
    -   **Body**: `{ "quiz_id": "string", "quiz_answers": [{"question_index": "integer", "selected_option": "integer"}] }`
    -   **Response**: A JSON object with the score and evaluation feedback.

-   `GET /health`
    -   A health check endpoint to confirm the server is running.
