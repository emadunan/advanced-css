import { useQuizContext } from "./context/QuizContext";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";

export default function App() {
  const { status, index, questionsCount } = useQuizContext();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <footer>
              <Timer />
              <NextButton>
                {index === questionsCount - 1 ? "Finish" : "Next"}
              </NextButton>
            </footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
