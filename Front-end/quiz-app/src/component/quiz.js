/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Header from './Header/header';
import Question from './question/question';
import Answer from './answer/answer';
import Progress from './progress/progress';
import { useState, useEffect } from 'react';
import './quiz.css';
import data from '../assets/data.json';
import pos from '../assets/pos.png';
import correct from '../assets/correct.png';
import wrong from '../assets/wrong.png';
import timer from '../assets/clock.png';
import axios from 'axios';

const END_POINT = 'http://localhost:5000/word';

function Quiz() {
  const [hardMode, setHardMode] = useState(false);
  const [clicked, setClicked] = useState(null);
  const [showRank, setShowRank] = useState(false);
  const [rank, setRank] = useState([]);
  const [correctfeedback, setCorrectfeedback] = useState(null);
  const [wrongfeedback, setWrongfeedback] = useState(null);
  const [wordList, setWordList] = useState([]);
  // const [feedback, setFeedback] = useState(null);
  const answers = ['noun', 'verb', 'adjective', 'adverb'];
  const [currentQuestion, setcurrentQuestion] = useState({});
  const [questionNumber, setQuestionNumber] = useState(0);
  const [start, setStart] = useState(false);
  const [score, setScore] = useState(0);
  const next = questionNumber < 9 ? 'Next' : 'Show Rank';
  const [time, setTime] = useState(null);

  const changeMode = () => {
    strartQuiz();
    setStart(false);
  };
  const startHardMode = () => {
    strartQuiz();
    setHardMode(true);
  };

  const trayAgain = () => {
    if (hardMode) {
      strartQuiz();
      setHardMode(true);
    } else {
      strartQuiz();
    }
  };
  const strartQuiz = () => {
    setQuestionNumber(0);
    setcurrentQuestion(wordList[0]);
    setStart(true);
    setShowRank(false);
    setScore(0);
    setRank([]);
    setCorrectfeedback(null);
    setWrongfeedback(null);
    setHardMode(false);
    setTime(10);
  };
  const nextQuestion = () => {
    if (questionNumber < 9) {
      setQuestionNumber(questionNumber + 1);
      setcurrentQuestion(wordList[questionNumber + 1]);
      setCorrectfeedback(null);
      setWrongfeedback(null);
      // setFeedback(null);
      setClicked(false);
      setTime(10);
    } else {
      GetRank();
      setShowRank(true);
      setQuestionNumber(0);
      setcurrentQuestion(wordList[0]);
      setClicked(false);
      setTime(10);
    }
  };

  const checkAnswer = (answer) => {
    if (answer === currentQuestion.pos && !clicked) {
      setClicked(true);
      setCorrectfeedback(true);
      setScore(score + 1);
      // setFeedback(true);
    } else if (answer !== currentQuestion.pos && !clicked) {
      // setFeedback(false);
      setClicked(true);
      setWrongfeedback(true);
    }
    if (answer !== currentQuestion.pos && !clicked && hardMode) {
      setWrongfeedback(true);
      // setFeedback(null);
      setClicked(true);
      if (score > 0) {
        setScore(score - 1);
      }
    }
  };

  const GetRank = () => {
    axios.post(`${END_POINT}/getRank`, { score: score * 10 }).then((res) => {
      setRank(res.data.rank);
      console.log(res.data.rank);
    });
  };

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get(END_POINT).then((response) => {
      setWordList(response.data.randomList);
    });
  }, []);

  useEffect(() => {
    setcurrentQuestion(wordList[0]);
  }, [wordList]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  });

  useEffect(() => {
    if (time === 0 && hardMode) nextQuestion();
  }, [time]);

  if (!start) {
    return (
      <>
        <Header />
        <div className="container">
          <div className="welcome">
            <div className="welcome-text">
              <h1> Welcome to POS quiz </h1>
              <span>
                Online grammar quiz to test your understanding of English parts
                of speech.
              </span>
            </div>
            <img
              className="pos"
              src={pos}
              width={300}
              height={200}
              alt="logo"
            />
          </div>
          <div className="mode">
            <button className="button2" onClick={strartQuiz}>
              Easy Mode
            </button>
            <button className="button4" onClick={startHardMode}>
              Hard Mode
            </button>
          </div>
        </div>
      </>
    );
  }

  if (showRank) {
    return (
      <>
        <Header />
        <div className="rank">
          <div className="rank1">
            <div className="rank2">
              <div className="rank3">
                <div className="rank4">
                  <span>
                    your rank <p>{Math.floor(rank)}</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="button3" onClick={trayAgain}>
          Try Again
        </button>
        <button className="button5" onClick={changeMode}>
          Change Mode
        </button>
      </>
    );
  }

  if (start) {
    return (
      <>
        <Header />
        <div className="container">
          <div className="counter1">
            <div className="counter2">
              <span> Question number</span>
             <span>{questionNumber + 1}</span> 
            </div>
          </div>
          {hardMode && (
            <div className="timerImage">
              <img src={timer} alt="wrong" width={70} height={70} />
            </div>
          )}
          {hardMode && (
            <div className="timer1">
              <div className="timer2">{time}</div>
            </div>
          )}
          <Progress questionNumber={questionNumber} max={10} />
          <Question element={data} question={currentQuestion} />
          <div className="correct">
            <Answer
              answers={answers}
              currentQuestion={currentQuestion}
              checkAnswer={checkAnswer}
            />
            {wrongfeedback && (
              <img src={wrong} alt="wrong" width={130} height={120} />
            )}
            {correctfeedback && (
              <img src={correct} alt="correct" width={130} height={120} />
            )}
          </div>
          <div className="next">
            <button className="btn2" onClick={nextQuestion}>
              {next}
            </button>
          </div>
        </div>
      </>
    );
  }
}
export default Quiz;
