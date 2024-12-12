import React, { useState } from "react";
import styled from "styled-components";

const Quiz = ({ quizData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (option, index) => {
    const correctAnswerIndex = quizData[currentQuestionIndex].answer;
    setSelectedAnswer(index);

    if (index === correctAnswerIndex) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 500); // Delay for 500 ms to show selection feedback
  };

  if (showResult) {
    return (
      <Results>
        <ResultsHeader>Вы завершили тест</ResultsHeader>
        <ResultsText>
          Ваш результат: {score}/{quizData.length}.
        </ResultsText>
      </Results>
    );
  }

  const question = quizData[currentQuestionIndex];

  return (
    <QuizContainer>
      <QuestionSection>
        <Question>{question.question}</Question>
        <AnswerList>
          {question.options.map((option, index) => (
            <Answer
              key={index}
              className={`answer ${
                selectedAnswer === index
                  ? index === question.answer
                    ? "correct"
                    : "incorrect"
                  : ""
              }`}
              onClick={() => handleAnswerSelect(option, index)}
            >
              {option}
            </Answer>
          ))}
        </AnswerList>
      </QuestionSection>
    </QuizContainer>
  );
};

export default Quiz;

const QuizContainer = styled.div`
  width: 100%;
  margin-top: 12px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  max-width: 1000px;
`;

const QuestionSection = styled.div`
  color: #333;
`;

const Question = styled.h2`
  color: #333;
`;

const AnswerList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Answer = styled.li`
  padding: 10px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;

  &.correct {
    background-color: #dff0d8 !important;
  }

  &.incorrect {
    background-color: #f2dede !important;
  }

  &:hover {
    background-color: #f9f9f9;
  }
`;

const Results = styled.div`
  text-align: center;
  padding: 20px;
`;

const ResultsHeader = styled.h1`
  color: #333;
`;

const ResultsText = styled.p`
  color: #333;
`;
