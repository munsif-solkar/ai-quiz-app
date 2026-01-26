import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup } from "../ui/radio";

const QuizForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {

const Intensityoptions = [
    { id: "easy", label: "Easy", value: "easy" },
    { id: "medium", label: "Medium", value:"medium" },
    { id: "hard", label: "Hard", value: "hard" },
  ]

  const [topic, setTopic] = useState("");
  const [intensity, setIntensity] = useState("easy");
  const [questionsCount, setQuestionsCount] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ topic, intensity, questionsCount });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Generate Quiz
      </h2>

      {/* Topic / Query */}
      <label className="block mb-3">
        <span className="text-sm font-medium text-gray-700">Topic</span>
        <Input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Eg: Python FastApi Framework"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          required
        />
      </label>

      {/* Intensity */}
      <label className="block mb-3">
        <span className="text-sm font-medium text-gray-700">Intensity</span>
        <RadioGroup name="users" options={Intensityoptions} selectedValue={intensity} onChange={setIntensity} />
      </label>

      {/* Questions Count */}
      <label className="block mb-5">
        <span className="text-sm font-medium text-gray-700">Number of Questions</span>
        <input
          type="number"
          min={1}
          max={50}
          value={questionsCount}
          onChange={(e) => setQuestionsCount(Number(e.target.value))}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        />
      </label>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition"
      >
        Generate Quiz
      </Button>
    </form>
  );
};

export default QuizForm
