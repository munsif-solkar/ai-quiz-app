import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup } from "../ui/radio";
import type {Query} from "./querySchema";
import useRelatedTopicsStore from "../../store/relatedTopicsStore"
import useErrorStore from "../../store/errorStore";

const QuizForm = ({ onSubmit }: { onSubmit: (data: Query) => void }) => {

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
    onSubmit({ topic, intensity, 'length': questionsCount });
  };

  const getRelatedTopics = useRelatedTopicsStore(state => state.relatedTopics)
  const error = useErrorStore(state => state.error)

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white border-black border-2 rounded-3xl space-y-3"
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
          className={`mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 ${error ? 'border-red-500' : ''}`}
          required
        />
        {error && <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>}
      </label>

      {/* Intensity */}
      <label className="block mb-3">
        <span className="text-sm font-medium text-gray-700">Intensity</span>
        <RadioGroup name="users" options={Intensityoptions} selectedValue={intensity} onChange={setIntensity} />
      </label>

      {/* Questions Count */}
      <label className="block mb-5">
        <span className="text-sm font-medium text-gray-700">Number of Questions (Max:20)</span>
        <input
          type="number"
          min={1}
          max={20}
          value={questionsCount}
          onChange={(e) => setQuestionsCount(Number(e.target.value))}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        />
      </label>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="secondary"
        className="w-full"
      >
        Generate Quiz
      </Button>
      <div>
        <p className="text-xs text-gray-500 mt-2">
          Note: Quiz generation may take up to 30 seconds.
        </p>
      </div>
      <div>
        {getRelatedTopics.length > 0 && (
           <div className="related-topics space-y-2">
                  <h3 className="text-lg font-semibold">Related Topics</h3>
                  <ul className="flex flex-row flex-wrap gap-x-3 gap-y-1.5">
                    {getRelatedTopics.map((topic, index) => (
                      <li key={index} className="text-gray-600 font-semibold  rounded-full text-sm hover:text-blue-500 cursor-pointer" onClick={() => setTopic(topic)}>
                        {topic}
                      </li>
                    ))}
                  </ul>
           </div>
        )}
      </div>
    </form>
  );
};

export default QuizForm
