import React from "react";
import Options from "./Options";
import { useQuizContext } from "../context/QuizContext";

export default function Question() {
  const { question} = useQuizContext();

  return (
    <div>
      <h4>{question.question}</h4>
      <Options />
    </div>
  );
}
