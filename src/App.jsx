import { useState } from "react";
import "./App.css";
import Confetti from "react-confetti";
import jigSaw from "./assets/jigsaw.gif";
import yaaay from "./assets/yaaay.png";
import ja from "./assets/ja.jpg";
import myGirl from "./assets/looser.png";
import looserVideo from "./assets/MOVIE.mp4";
import pretty from "./assets/pretty.jpg";
import tomorrow from "./assets/tomorrow.jpg";
import sure from "./assets/sure.jpg";
import schlecht from "./assets/schlecht.jpg";

const questions = [
  {
    id: 0,
    question: "Do you wanna play a game?",
    answer: "Yes",
    options: ["Yes", "No"],
    nextYes: 1,
    nextNo: 2,
    image: jigSaw,
  },
  {
    id: 1,
    question: "Do you want to go on date with me?",
    answer: "Yes",
    options: ["Yes", "No"],
    nextYes: 3,
    nextNo: 4,
    image: ja,
  },
  {
    id: 2,
    question: "R u looser or what??",
    answer: "Yes",
    options: ["Yes", "No, let's play then "],
    nextYes: 0,
    nextNo: 1,
    video: looserVideo,
  },
  {
    id: 3,
    question: "R u my girrrl?",
    answer: "Yes",
    options: ["Yes", "No"],
    nextYes: 5,
    nextNo: 6,
    image: myGirl,
  },
  {
    id: 4,
    question: "Why? Am I not pretty enough?",
    answer: "No, u r handsome",
    options: ["Yes, ugly boiii", "No, u r handsome"],
    nextYes: 7,
    nextNo: 6,
    image: pretty,
  },
  {
    id: 5,
    question: "So, tomorrow we got a date??",
    answer: "Yes",
    options: ["Yes", "No"],
    nextYes: null,
    nextNo: 4,
    image: tomorrow,
  },
  {
    id: 6,
    question: "R u sure???",
    answer: "Yes",
    options: ["Yes", "No"],
    nextYes: 7,
    nextNo: null,
    image: sure,
  },
  {
    id: 7,
    question: "Too bad, u r going with the ugly boiii on a date :P",
    answer: "Ok",
    options: ["Ok", "Seen"],
    nextYes: null,
    nextNo: null,
    image: schlecht,
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  const handleAnswer = (answer) => {
    setAnsweredQuestions((prev) => prev + 1);
    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion =
      answer === questions[currentQuestion].options[0]
        ? questions[currentQuestion].nextYes
        : questions[currentQuestion].nextNo;
    if (nextQuestion !== null) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const title = () => {
    const percent = score / answeredQuestions;
    if (percent > 0.8) {
      return "You are the best!";
    } else if (percent > 0.6) {
      return "Not great, not terrible";
    } else if (percent > 0.4) {
      return "MEDIOCRE!";
    } else if (percent > 0.2) {
      return "You are sooo schlecht!";
    } else {
      return "LOOSER, u did sooo schlecht!";
    }
  };

  return (
    <div className="App">
      {showResult ? (
        <>
          <div className="card">
            <Confetti />
            <img src={yaaay}></img>
            <h3>
              Yaaay, looking forward to the date, babyyy
              <br />
              and happy 1st anniversary! ♥♥♥
            </h3>
            <p>
              Btw, your score is {score} out of {answeredQuestions}
            </p>
            <h5>{title()}</h5>
          </div>
        </>
      ) : (
        <div className="card">
          {questions[currentQuestion].image ? (
            <img src={questions[currentQuestion].image}></img>
          ) : null}
          {questions[currentQuestion].video ? (
            <video
              src={questions[currentQuestion].video}
              style={{ maxHeight: "50vh" }}
              autoPlay
              loop
            ></video>
          ) : null}
          <h2>{questions[currentQuestion].question}</h2>
          <div className="buttonWrap">
            <button
              onClick={() =>
                handleAnswer(questions[currentQuestion].options[0])
              }
            >
              {questions[currentQuestion].options[0]}
            </button>
            <button
              onClick={() =>
                handleAnswer(questions[currentQuestion].options[1])
              }
            >
              {questions[currentQuestion].options[1]}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
