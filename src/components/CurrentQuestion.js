import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { quiz } from '../reducers/quiz'

const QuestionBackgroundImage = styled.div`
  background-image: url('https://images.unsplash.com/photo-1535385793343-27dff1413c5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1430&q=80');
  background-color: rgb(205, 206, 201);
  background-size: cover;
  height: 600px;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Helvetica Neue';
  font-size: 10px;
`

const QuestionText = styled.div`
  background-color: rgb(205, 206, 201);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const AnswerButton = styled.button`
  width: 250px;
  height: 100px;
`

export const CurrentQuestion = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const questions = useSelector(state => state.quiz.questions)
  const question = useSelector(state => state.quiz.questions[state.quiz.currentQuestionIndex])
  const answers = useSelector(state => state.quiz.answers)
  const currentQuestionIndex = useSelector(state => state.quiz.currentQuestionIndex)
  const quizOver = useSelector(state => state.quiz.quizOver)
  // console.log(answers)

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>
  }

  const onSubmitAnswer = index => {
    dispatch(quiz.actions.submitAnswer({ questionId: question.id, answerIndex: index }))
    console.log('click')
  }

  const onButtonClick = () => {
    // if not all questions are answered dispatch goToNextQuestion
    // if all questions are answered navigate to summary
    if (answers.length !== questions.length) {
      dispatch(quiz.actions.goToNextQuestion())
    } else {
      navigate('/summary')
    }
  }

  // efter ett val så får man reda på om det var rätt/fel samt att knapparna blir disabled + det kommer en "next question" knapp

  return (
    <QuestionBackgroundImage>
      <div>
        <QuestionText>
          <h1> {question.questionText}</h1>
          {question.options.map((option, index) => (
            <button
              key={option}
              type='button'
              disabled={answers.length === question.id}
              className={
                // check if answerIndex matches button index if ok => check if answer is correct
                // if correct style with correct otherwise incorrect classes
                answers[currentQuestionIndex]?.answerIndex === index
                  ? answers[currentQuestionIndex]?.isCorrect
                    ? 'button correct'
                    : 'button incorrect'
                  : 'button'
              }
              onClick={() => onSubmitAnswer(index)}>
              {option}
            </button>
          ))}
          {/* conditionally show button only when an option is selected then
              conditionally set the button text  based on if the quiz is still going or in the end
              maybe not the most elegant way.
              the click is handled in the onButtonClick function */}
          {answers.length === question.id && !quizOver && (
            <button type='button' onClick={() => onButtonClick()}>
              {answers.length !== questions.length ? 'Next Question' : 'Show results'}
            </button>
          )}
        </QuestionText>
        <div>{answers[currentQuestionIndex]?.isCorrect && <p>{question.answerText}</p>}</div>
      </div>
    </QuestionBackgroundImage>
  )
}
// button:focus{background-color:red;}
// export const Square = ({ value, index }) => {
//   const dispatch = useDispatch();

//   const handleClick = () => {
//     dispatch(game.actions.captureSquare({ index }));
//   };

//   return (
//     <button
//       className={value === null ? "square clickable" : "square"}
//       type="button"
//       onClick={handleClick}
//     >
//       <Player value={value} />
//     </button>
//   );
// };

// import { createSlice } from '@reduxjs/toolkit'
// import { calculateWinner } from 'utils/calculateWinner'

// const newGame = {
//   squares: [
//     null, null, null,
//     null, null, null,
//     null, null, null
//   ],
//   winner: null,
//   player: 'x'
// }

// export const game = createSlice({
//   name: 'game',
//   initialState: newGame,
//   reducers: {
//     captureSquare: (state, action) => {
//       const { index } = action.payload

//       // If the square is 'uncaptured', capture it
//       if (state.squares[index] === null) {
//         state.squares[index] = state.player
//       }

//       // Change the player to the next player
//       if (state.player === 'x') {
//         state.player = 'o'
//       } else {
//         state.player = 'x'
//       }

//       // If a winner hasn't already been declared, then check
//       // who the winner is
//       if (!state.winner) {
//         state.winner = calculateWinner(state.squares)
//       }
//     },
//     restart: () => {
//       return newGame
//     }
//   }
// })

// import React from "react";
// import { useSelector } from "react-redux";
// import { Square } from "components/Square";

// export const Board = () => {
//   const squares = useSelector((store) => store.game.squares);

//   return (
//     <div className="board">
//       {squares.map((value, index) => (
//         <Square key={index} value={value} index={index} />
//       ))}
//     </div>
//   );
// };
