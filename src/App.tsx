import React, { useState } from 'react';
import { QuestionCard } from './components/QuestionCard';
import { fetchQuestions, Difficulty, QuestionState } from './API';
import {GlobalStyle,Wrapper} from './App.styles';

const TOTAL_QUESTIONS = 10;
type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}
function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setuserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  console.log(questions);

  console.log(fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY));

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setuserAnswer([]);
    setNumber(0);
    setLoading(false);
  }

  const nextQuestion = async () => {
const nextQuestion=number+1;
if(nextQuestion===TOTAL_QUESTIONS){
  setGameOver(true);
}
else
{
  setNumber(nextQuestion);
}
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      //const quest=questions[number].question;
      if (correct) setScore(prev => prev + 1)
      const AnswerObject = {
        //question: questions[number].question,
        questions,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer

      }
      setuserAnswer(prev => [...prev, AnswerObject])

    }
  };


  return (
    <>
    <Wrapper>
    <GlobalStyle />
    <div className="App">
      <h1>QUIZ</h1>
      {gameOver || userAnswer.length === TOTAL_QUESTIONS ? (
        <button className='start' onClick={startQuiz}>
          Get Started
        </button>) : null}

      {!gameOver ? (
        <p className='score'>
          Score:{score}
        </p>) : null}

      {loading ? (
        <p>
          Loading
        </p>) : null}

      {!loading && !gameOver ? (
        <QuestionCard
          questionNum={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
          callback={checkAnswer}
        />) : null}

      {!gameOver && !loading && userAnswer.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <button className='next' onClick={nextQuestion}>
          Next
        </button>) : null}
    </div>
    </Wrapper>
    </>
  )
  
};
export default App;
