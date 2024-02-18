import React from "react";
import Options from "./Options";
import { useQuizContext } from "../context/QuizContext";

export default function Question() {
  const { questions, index, answer, dispatch } = useQuizContext();

  const question = questions[index];

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} answer={answer} dispatch={dispatch} />
    </div>
  );
}
